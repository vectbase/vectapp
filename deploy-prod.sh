docker build -t harbor.vectbase.com/prod/app-vectbase:v0.0.1 .
docker push harbor.vectbase.com/prod/app-vectbase:v0.0.1
kubectl -n webapp delete -f app-vectbase-prod.yaml
kubectl -n webapp create -f app-vectbase-prod.yaml
kubectl -n webapp delete -f app-vectbase-ingress-prod.yaml
kubectl -n webapp create -f app-vectbase-ingress-prod.yaml
