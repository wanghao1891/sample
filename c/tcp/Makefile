TARGET_PATH=bin

all: path server client

path:
	mkdir ${TARGET_PATH}

server: server.o
	gcc -o ${TARGET_PATH}/server server.o

server.o: server.c
	gcc -c server.c

client: client.o
	gcc -o ${TARGET_PATH}/client client.o

client.o: client.c
	gcc -c client.c

clean:
	rm -fr ${TARGET_PATH}
