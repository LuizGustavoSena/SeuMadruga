import 'dotenv';
import app from './app';

const port = process.env.port || 3001;

app.listen(port, () => console.log(`Server is running in port ${port}`));