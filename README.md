# Simple CRUD React App for Books 

This is a simple React App to Create, Read, Update and Delete books. For all these operations, it call a backend API developed in Python/Flask. 

You can find the source code of the backend app [here](https://github.com/carmel-wenga/python-flask-crud-api-for-book-library).

# Deploying the Application 

## Using Docker-Compose

## Using Kubernetes

### Define manisfest files
Folder ```k8s``` contains the following configuration files:
* ```deployment.yaml```: create the frontend pod and expose port 3000,
* ```service.yaml```: expose the frondend pod as a service on port 80,
* ```ingress.yaml```: expose the frontend and the backend through an nginx ingress listening port 80, and redirecting traffic to the flask backend (```/api```) or the react frontend (everything that do not start with ```api```).

### Install/Configure nginx ingress controller
```commandline
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml
```

### Build the Docker Image used for the deployment of the frontend
I have set the environment variables useful the call the flask backend from the react frontend. Since the flask backend is accessible through the ingress, the environment variable will be:

```commandline
PROTOCOL=http 
HOST=localhost 
PORT=80
API_VERSION=/api/v1
```

Those values should be set as argument when building the image of the react frontend:

```commandline
$ docker build -t libexplorer:latest --build-arg PROTOCOL=http --build-arg HOST=localhost --build-arg PORT=80 --build-arg API_VERSION=/api/v1 .
```

These variable will help build the flask's backend URL as:
```javascript
const API_BASE_URL = `${API_SERVER.PROTOCOL}://${API_SERVER.HOST}:${API_SERVER.PORT}${API_SERVER.API_VERSION}`;
```

Result: ```API_BASE_URL=http://localhost:80/api/v1```

### Apply the manifest files inside the k8s cluster
This command will apply all the configuration in the k8s cluster.

```commandline
$ kubectl apply -f k8s/
```

### Launch the application
Deploy the [flask backend](https://github.com/carmel-wenga/python-flask-crud-api-for-book-library) first and go to ```localhost/books``` using your local browser.


