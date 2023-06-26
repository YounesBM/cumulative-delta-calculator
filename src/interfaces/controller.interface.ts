import { Router } from 'express';

// Interface representing a controller
interface Controller {
  path: string; // Base path for the controller's routes
  router: Router; // Express router for defining the controller's routes
}

export default Controller;
