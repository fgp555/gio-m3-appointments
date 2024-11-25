import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar el prefijo global para las rutas de la API
  app.setGlobalPrefix('api');

  // Servir archivos estáticos (SPA) en la raíz '/'
  app.useStaticAssets(join(__dirname, '..', '..', 'front/dist'), {
    prefix: '/',
  });

  // Enrutamiento: devolver index.html para todas las rutas que no sean /api
  // Hacer que las rutas no relacionadas con /api sean redirigidas a index.html
  // app
  //   .getHttpAdapter()
  //   .getInstance()
  //   .all('*', (req, res, next) => {
  //     // Si la solicitud no comienza con /api, redirige a index.html de la SPA
  //     if (!req.url.startsWith('/api')) {
  //       res.sendFile(join(__dirname, '..', '..', 'front/dist', 'index.html'));
  //     } else {
  //       next();
  //     }
  //   });

  // // Get the ExpressAdapter instance
  // const expressApp = app.getHttpAdapter().getInstance();

  // // Servir los archivos estáticos de la carpeta 'build' (cambia la ruta si es necesario)
  // expressApp.useStaticAssets(join(__dirname, '..', 'my-spa/build'));

  // // Enrutamiento: todas las rutas que no se reconozcan deben devolver el index.html
  // expressApp.all('*', (req, res) => {
  //   res.sendFile(join(__dirname, '..', 'my-spa/build', 'index.html'));
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
