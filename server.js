const dotenv = require('dotenv');
const app = require('./app');

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = async () => {
  dotenv.config({ path: '.env' });

  const port = process.env.APP_PORT || 3000;

  const server = app.listen(port, () => {
    console.log(`App running on port ${(port)}...`)
  });
  
  

  // In case of an error
  app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack);
    console.error('on url', appCtx.req.url);
    console.error('with headers', appCtx.req.headers);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);

    // Close server & exit process
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
};

// Setup server configurations and share port address for incoming requests

setTimeout(() => {
  setUpExpress();
}, 700);
