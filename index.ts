import express from 'express';
import grayscale from './endpoints/grayscale';
import rotate from './endpoints/rotate';
const app = express();

const endpoints: { [key: string]: (req: express.Request, res: express.Response) => void } = {
  grayscale,
  rotate
};

app.get('/', (req, res) => {
  res.send("Available endpoints: " + Object.keys(endpoints).join(", "));
});

app.get('/api/:endpoint', (req, res) => {
  const endpoint = req.params.endpoint;
  const endpointFunction = endpoints[endpoint];

  if (!endpointFunction) {
    res.status(404).send("Endpoint not found");
  } else {
    endpointFunction(req, res);
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
