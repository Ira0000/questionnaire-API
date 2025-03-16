import { Response } from '../db/models/Response.js';

export const getResponseById = async (responseId) => {
  const response = await Response.findOne({ _id: responseId });
  // .populate('answers.question_id') // Populate the question details if needed
  // .exec();
  return response;
};

export const createResponse = async (payload) => {
  const newResponse = new Response(payload);
  await newResponse.save(); // Save the response to the database
  return newResponse;
};
