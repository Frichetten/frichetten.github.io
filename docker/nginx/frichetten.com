server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name frichetten.com www.frichetten.com;

  root /usr/share/nginx/html;
  index index.html;

  ssl_certificate /etc/letsencrypt/live/frichetten.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/frichetten.com/privkey.pem;

  ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header Content-Security-Policy "script-src 'self' code.jquery.com stackpath.bootstrapcdn.com;";  
  add_header X-Frame-Options SAMEORIGIN;
  add_header X-XSS-Protection "1; mode=block";
  add_header X-Content-Type-Options nosniff;
  add_header Referrer-Policy "no-referrer";
  add_header Feature-Policy "geolocation 'none';midi 'none';sync-xhr 'none';microphone 'none';camera 'none';magnetometer 'none';gyroscope 'none';speaker 'none';fullscreen 'none';payment 'none';";
  add_header Alt-Svc 'h2="nickf43ab43xxf3yqgzy5uedsjij6h473rmbyzq6inohcnr3lohlu3yd.onion:443"; ma=86400; persist=1';

  ssl_buffer_size 8k;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;

  ssl_stapling on;
  ssl_stapling_verify on;
 
  location / {
    try_files $uri $uri/ =404;
  }
}

# Handles redirect
server {
  listen 80;
  listen [::]:80;

  if ($host = www.frichetten.com) {
    return 301 https://$host$request_uri;
  } 

  if ($host = frichetten.com) {
    return 301 https://$host$request_uri;
  } 

  server_name frichetten.com www.frichetten.com;
  return 404;
}
