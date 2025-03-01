import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.database_url}`);
    });
    await mongoose.connect(config.database_url as string);
  } catch (error) {
    console.log(error);
  }
}

main();
