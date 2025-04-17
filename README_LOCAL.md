## Docker Environment

```shell
docker run -it -v $(pwd):/apps --workdir /apps -p 4200:4200 --entrypoint sh node:18.20.6-alpine3.21
```

```shell
./node_modules/@angular/cli/bin/ng.js serve --host 0.0.0.0
 ```

docker host
host.docker.internal

### Resources
- Register services in app.module.ts in the providers section to make them injectable
- to call backend, add your backend url, to src/proxy.conf.json; when you make the request; make it to target in proxy config, see CourseService for example
- Forms and validation
  - https://angular.dev/guide/forms/form-validation
  - https://jasonwatmore.com/post/2022/12/05/angular-14-dynamic-add-edit-form-that-supports-create-and-update-mode#users-add-edit-component-ts
