# jenkins部署使用的  需要修改
FROM nginx:1.15-alpine
COPY dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
