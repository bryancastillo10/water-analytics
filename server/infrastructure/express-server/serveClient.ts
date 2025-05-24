import path from 'path';
import express, { Express } from 'express';

export const serveClient = (app: Express) => {
  const clientBuildPath = path.join(__dirname, '../../../client/dist');

  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
};
