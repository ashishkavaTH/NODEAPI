const { CastError } = require("mongoose");
const { postTutorialSchema } = require("../JoiValidation/joi");
const Tutorial = require("../models/tutorial.schema");
const logger = require("../init/logger");

const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({
      createdAt: -1,
    });
    res.status(200).send(tutorials);
    logger.info('Get all tutorials');
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    logger.error('Internal server error');
  }
};

const createTutorial = async (req, res) => {
  try {
    const { error, value } = postTutorialSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const tutorial = new Tutorial(value);
    await tutorial.save();
    res.status(201).send(tutorial);
    logger.info('New tutorial created');
  } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
      logger.error('Internal server error');
    }
  return null;
};

const updateTutorial = async (req, res) => {
  try {
    const { error, value } = postTutorialSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const tutorial = await Tutorial.findByIdAndUpdate(
      { _id: req.params.id },
      value,
    );
    if (tutorial === null) {
       return res.status(404).send({ message: "Tutorial not found" });
    } 
      res.status(204).send();
      logger.info('Tutorial updated');
  } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
      logger.error('Internal server error');
  }
};

const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (tutorial === null) {
      res.status(400).send({ message: "Invalid Tutorial details" });
    } else {
      res.status(200).send();
      logger.info('Tutorial deleted');
    }
  } catch (error) {
    if (error) {
      res.status(400).send({ message: "Invalid Tutorial details" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      logger.error('Internal server error');
    }
  }
};

const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (tutorial === null) {
      res.status(404).send({ message: 'Tutorial not found' });
    } else {
      res.status(200).send();
      logger.info('Tutorial get by id');
    }
  } catch (error) {
    if (error) {
      res.status(404).send({ message: "Tutorial not found" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      logger.error('Internal server error');
    }
  }
};

module.exports = {
  getTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
};
