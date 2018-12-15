/* A simple server in the internet domain using TCP
   The port number is passed as an argument */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/event.h>
#include <stdbool.h>        // bool
#include <assert.h>         // assert

void error(const char *msg)
{
  perror(msg);
  exit(1);
}

int main(int argc, char *argv[])
{
  int sockfd, newsockfd, portno;
  socklen_t clilen;
  char buffer[256];
  struct sockaddr_in serv_addr, cli_addr;
  int n;
  if (argc < 2) {
    fprintf(stderr,"ERROR, no port provided\n");
    exit(1);
  }
  sockfd = socket(AF_INET, SOCK_STREAM, 0);
  if (sockfd < 0)
    error("ERROR opening socket");
  bzero((char *) &serv_addr, sizeof(serv_addr));
  portno = atoi(argv[1]);
  serv_addr.sin_family = AF_INET;
  serv_addr.sin_addr.s_addr = INADDR_ANY;
  serv_addr.sin_port = htons(portno);
  if (bind(sockfd, (struct sockaddr *) &serv_addr,
           sizeof(serv_addr)) < 0)
    error("ERROR on binding");
  listen(sockfd,5);

  {
    /* kevent set */
    struct kevent kevSet;
    /* events */
    struct kevent events[20];
    /* nevents */
    unsigned nevents;
    /* kq */
    int kq;
    /* buffer */
    char buf[20];
    /* length */
    ssize_t readlen;

    kevSet.data     = 5;    // backlog is set to 5
    kevSet.fflags   = 0;
    kevSet.filter   = EVFILT_READ;
    kevSet.flags    = EV_ADD;
    kevSet.ident    = sockfd;
    kevSet.udata    = NULL;

    assert((kq = kqueue()) > 0);

    /* Update kqueue */
    assert(kevent(kq, &kevSet, 1, NULL, 0, NULL) == 0);

    /* Enter loop */
    while (true) {
      /* Wait for events to happen */
      nevents = kevent(kq, NULL, 0, events, 20, NULL);

      assert(nevents >= 0);

      fprintf(stderr, "Got %u events to handle...\n", nevents);

      for (unsigned i = 0; i < nevents; ++i) {
        struct kevent event = events[i];
        int clientfd        = (int)event.ident;

        /* Handle disconnect */
        if (event.flags & EV_EOF) {

          /* Simply close socket */
          close(clientfd);

          fprintf(stderr, "A client has left the server...\n");

        } else if (clientfd == sockfd) {
          int nclientfd = accept(sockfd, NULL, NULL);

          assert(nclientfd > 0);

          /* Add to event list */
          kevSet.data     = 0;
          kevSet.fflags   = 0;
          kevSet.filter   = EVFILT_READ;
          kevSet.flags    = EV_ADD;
          kevSet.ident    = nclientfd;
          kevSet.udata    = NULL;

          assert(kevent(kq, &kevSet, 1, NULL, 0, NULL) == 0);

          fprintf(stderr, "A new client connected to the server...\n");

          (void)write(nclientfd, "Welcome to this server!\n", 24);
        } else if (event.flags & EVFILT_READ) {

          /* sleep for "processing" time */
          readlen = read(clientfd, buf, sizeof(buf));

          buf[readlen - 1] = 0;

          fprintf(stderr, "bytes %zu are available to read... %s \n", (size_t)event.data, buf);

          //sleep(4);
        } else {
          fprintf(stderr, "unknown event: %8.8X\n", event.flags);
        }
      }
    }
  }

  return 0;
}
