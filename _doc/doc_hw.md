```bash
npm i -g @nestjs/cli
nest -v
nest new .


# ========== 5 TypeORM ==========
npm install dotenv
npm install @nestjs/typeorm @nestjs/config typeorm pg

# migrations
npm run migration:create src/migrations/prueba
npm run build
npm run migration:run

npm run build
npm run migration:generate src/migrations/initial
npm run build
npm run migration:run

npm run start:dev


# ========== 6 pipes ==========
npm i class-validator class-transformer

# ========== 7 cloudinary ==========
npm i -D @types/multer
npm i cloudinary buffer-to-stream
# https://console.cloudinary.com/console/c-2e2dbe077bd7c496e46e39c51060de/media_library/search?q=&view_mode=mosaic


# ========== 8 Auth 1 ==========
npm install bcrypt @nestjs/jwt
# https://bcrypt.online/
# https://jwt.io/


# ========== 9 Auth 2 ==========
npm install express-openid-connect

# https://manage.auth0.com/dashboard/us/dev-md7dr4y44z6j0oe5/applications/wLlG1KN2upncpRljIAnbwLIQf1WTMcF8/quickstart/express/steps/2
# http://localhost:3000/users/auth0/protected
# http://localhost:3000/login
# http://localhost:3000/logout


# ==========  10 Testing ==========
 npm run test
 npm run test:watch
 npm run test:e2e
 npm run test:e2ewatch
# "test:e2ewatch": "jest --config ./test/jest-e2e.json --watch",


# ==========  11 Open API Integration ==========
npm install @nestjs/swagger

```
