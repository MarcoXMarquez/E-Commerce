import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log('JWT_SECRET en test-env:', process.env.JWT_SECRET);
