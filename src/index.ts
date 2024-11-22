//Importing project dependancies that we installed earlier
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path';
import { exec } from 'child_process';

//Importing .env validation 
import validateEnv from '@utils/validateEnv'
import { generatePNLImage } from "./core/generate.pnl.img";
import { TestPage } from "./test/index";
//App Varaibles 
dotenv.config()

validateEnv();

//intializing the express app 
const app = express();
//using the dependancies
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/assets/pnl', express.static(path.join(__dirname, 'assets/pnl')));

app.get('/', TestPage);
app.post('/create', generatePNLImage);


// Function to find the location of Chromium
const findChromiumPath = (): void => {
  exec('which chromium', (err, stdout, stderr) => {
    if (err) {
      console.error('Error locating Chromium:', stderr);
    } else {
      console.log('Chromium is located at:', stdout.trim());
    }
  });
};

findChromiumPath();

//exporting app
module.exports = app