docker run -it --rm \
-v /root/team5agile/Software_Code/docker-volumes/cert_bot/certs/:/etc/letsencrypt \
-v /root/team5agile/Software_Code/docker-volumes/cert_bot/certs_data/:/var/lib/letsencrypt \
-v "/root/team5agile/Software_Code/docker-volumes/cert_bot/certbot_logs/:/var/log/letsencrypt" \
-v /root/team5agile/Software_Code/docker-volumes/cert_bot/certbot/root/:/root/ \
certbot/certbot \
certonly --manual --preferred-challenges dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual-public-ip-logging-ok \
-d '*.team5agile.dumitruvulpe.com' -d team5agile.dumitruvulpe.com
