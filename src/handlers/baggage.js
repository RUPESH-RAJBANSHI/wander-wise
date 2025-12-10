import Baggage from "../models/baggage.js";

const createBaggage = async (baggageData) => {
  const baggage = await Baggage.create(baggageData);
  return baggage;
};

export { createBaggage };

 