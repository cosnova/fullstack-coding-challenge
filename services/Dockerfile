# common go configuration + all monorepo dependencies
FROM golang:1.17-alpine AS base
WORKDIR /usr/src
COPY go.mod ./
COPY . .

# build specific commands
FROM base AS build
ARG package
ARG port
EXPOSE ${port}
RUN go build -o /bin/server ${package}
ENTRYPOINT ["/bin/server"]
