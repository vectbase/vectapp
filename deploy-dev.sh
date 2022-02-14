docker build -t harbor.vectbase.com/dev/app-vectbase:v0.0.1 .
docker push harbor.vectbase.com/dev/app-vectbase:v0.0.1
kubectl -n webapp delete -f app-vectbase-dev.yaml
kubectl -n webapp create -f app-vectbase-dev.yaml
kubectl -n webapp delete -f app-vectbase-ingress-dev.yaml
kubectl -n webapp create -f app-vectbase-ingress-dev.yaml
