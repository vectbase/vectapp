From harbor.vectbase.com/prod/nginx:latest
EXPOSE 8080
ADD dist /dist/
ADD frontend.conf /etc/nginx/conf.d/frontend.conf
