FROM fholzer/nginx-brotli:v1.13.5

# Create app directory
RUN mkdir -p /usr/app/
WORKDIR /usr/app/

COPY dist/browser/ /usr/app/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
