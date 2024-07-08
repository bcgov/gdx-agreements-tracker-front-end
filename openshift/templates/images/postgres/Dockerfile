# OpenShift uses version from buildconfig - Don't update
FROM postgres:15-bullseye

RUN set -ex; \
    apt-get update; \

ENV RUNUSER postgres


COPY postgresql.conf /home

RUN set -ex; \
    chmod -R 555 /docker-entrypoint* ; \
    chmod 664 /etc/passwd /etc/group /etc/shadow ; \
    chown 0:0 /etc/shadow ; \
    chmod 775 /etc ; \
    mkdir -p /var/lib/postgresql/data ; \
    chown -R 0:0 /var/lib/postgresql ; \
    chmod -R 775 /var/lib/postgresql ; \
    mkdir -p /var/run ; \
    chown -R 0:0 /var/run ; \
    chmod -R 775 /var/run

VOLUME /var/lib/postgresql
VOLUME /var/run
CMD ["postgres", "-c", "config_file=/home/postgresql.conf"]