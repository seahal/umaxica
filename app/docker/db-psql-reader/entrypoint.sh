#!/bin/bash

set -e

while ! psql -h db-psql-writer -U $POSTGRES_USER -d dev_auth_db -p 5432 -c "select 'it is running';" 2>&1 ; do \
	sleep 1s ; \
done

# load backup from primary instance
pg_basebackup -h db-psql-writer -p 5432 -D /var/lib/postgresql/data/ -S replication_slot_slave1 --progress -X stream -U default -Fp -R || :

# start postgres
bash /usr/local/bin/docker-entrypoint.sh -c 'config_file=/etc/postgresql/postgresql.conf' -c 'hba_file=/etc/postgresql/pg_hba.conf'
