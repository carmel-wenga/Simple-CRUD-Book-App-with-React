# Simple CRUD React App for Books 

This is a simple React App to Create, Read, Update and Delete books. For all these operations, it call a backend API developed in Python/Flask. 

You can find the source code of the backend app [here](https://github.com/carmel-wenga/python-flask-crud-api-for-book-library).

## Build the Dockerfile
```commandline
docker build -t libexplorer:latest --build-arg PROTOCOL=http --build-arg HOST=backend-service --build-arg PORT=5000 --build-arg API_VERSION=/api/v1 .
```

kubectl port-forward deployment/libexplorer 8081

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

CNI
kube-proxy


