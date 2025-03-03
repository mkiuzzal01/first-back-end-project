import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    await mongoose.connect(config.database_url as string);
  } catch (error) {
    console.log("this error from server:",error);
  }
}

main();
