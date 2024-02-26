import { PrismaClient } from "@prisma/client";

import { existsSync, renameSync, unlinkSync } from "fs";

export const addProperty = async (req, res, next) => {
  try {
    // if (req.files) {
    // const fileKeys = Object.keys(req.files);
    // const fileNames = [];
    // fileKeys.forEach((file) => {
    //   const date = Date.now();
    //   renameSync(
    //     req.files[file].path,
    //     "uploads/" + date + req.files[file].originalname
    //   );
    //   fileNames.push(date + req.files[file].originalname);
    // });
    if (req.body) {
      const {
        title,
        description,
        applicantType,
        horizon,
        propertyType,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        minRooms,
        maxRooms,
        locations,
        features, // Assuming this is sent as an object
        amenities, // Assuming this is sent as an object
        images,
        orders,
        reviews,
      } = req.body;

      console.log(req.query);

      const prisma = new PrismaClient();

      await prisma.property.create({
        data: {
          title,
          description,
          applicantType,
          horizon,
          propertyType,
          minPrice,
          maxPrice,
          minArea,
          maxArea,
          minRooms,
          maxRooms,
          locations,
          features, // Assuming this is sent as an object
          amenities, // Assuming this is sent as an object
          images,
          orders,
          reviews,
        },
      });

      return res
        .status(201)
        .json({ message: "Successfully created the property." });
    }
    // }
    // return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserAuthProperties = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { properties: true },
      });
      return res.status(200).json({ properties: user?.properties ?? [] });
    }
    return res.status(400).send("UserId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getPropertyData = async (req, res, next) => {
  try {
    if (req.params.propertyId) {
      const prisma = new PrismaClient();
      const property = await prisma.properties.findUnique({
        where: { id: parseInt(req.params.propertyId) },
        include: {
          reviews: {
            include: {
              reviewer: true,
            },
          },
          createdBy: true,
        },
      });

      const userWithProperties = await prisma.user.findUnique({
        where: { id: property?.createdBy.id },
        include: {
          properties: {
            include: { reviews: true },
          },
        },
      });

      const totalReviews = userWithProperties.properties.reduce(
        (acc, property) => acc + property.reviews.length,
        0
      );

      const averageRating = (
        userWithProperties.properties.reduce(
          (acc, property) =>
            acc +
            property.reviews.reduce((sum, review) => sum + review.rating, 0),
          0
        ) / totalReviews
      ).toFixed(1);

      return res
        .status(200)
        .json({ property: { ...property, totalReviews, averageRating } });
    }
    return res.status(400).send("PropertyId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const editProperty = async (req, res, next) => {
  try {
    if (req.files) {
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const {
          title,
          description,
          // category,
          // features,
          // price,
          // revisions,
          // time,
          // shortDesc,
        } = req.query;
        const prisma = new PrismaClient();
        const oldData = await prisma.property.findUnique({
          where: { id: parseInt(req.params.propertyId) },
        });
        await prisma.property.update({
          where: { id: parseInt(req.params.propertyId) },
          data: {
            title,
            description,
            // deliveryTime: parseInt(time),
            // category,
            // features,
            // price: parseInt(price),
            // shortDesc,
            // revisions: parseInt(revisions),
            // createdBy: { connect: { id: parseInt(req.userId) } },
            // images: fileNames,
          },
        });
        oldData?.images.forEach((image) => {
          if (existsSync(`uploads/${image}`)) unlinkSync(`uploads/${image}`);
        });

        return res.status(201).send("Successfully Eited the propery.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const searchProperties = async (req, res, next) => {
  try {
    if (req.query.searchTerm || req.query.category) {
      const prisma = new PrismaClient();
      const properties = await prisma.property.findMany(
        createSearchQuery(req.query.searchTerm, req.query.category)
      );
      return res.status(200).json({ properties });
    }
    return res.status(400).send("Search Term or Category is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: {
      OR: [],
    },
    include: {
      reviews: {
        include: {
          reviewer: true,
        },
      },
      createdBy: true,
    },
  };
  if (searchTerm) {
    query.where.OR.push({
      title: { contains: searchTerm, mode: "insensitive" },
    });
  }
  if (category) {
    query.where.OR.push({
      category: { contains: category, mode: "insensitive" },
    });
  }
  return query;
};

const checkOrder = async (userId, propertyId) => {
  try {
    const prisma = new PrismaClient();
    const hasUserOrderedProperty = await prisma.property.findFirst({
      where: {
        buyerId: parseInt(userId),
        propertyId: parseInt(propertyId),
        isCompleted: true,
      },
    });
    return hasUserOrderedProperty;
  } catch (err) {
    console.log(err);
  }
};

export const checkPropertyOrder = async (req, res, next) => {
  try {
    if (req.userId && req.params.propertyId) {
      const hasUserOrderedProperty = await checkOrder(
        req.userId,
        req.params.propertyId
      );
      return res.status(200).json({
        hasUserOrderedProperty: hasUserOrderedProperty ? true : false,
      });
    }
    return res.status(400).send("userId and propertyId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const addReview = async (req, res, next) => {
  try {
    if (req.userId && req.params.propertyId) {
      if (await checkOrder(req.userId, req.params.propertyId)) {
        if (req.body.reviewText && req.body.rating) {
          const prisma = new PrismaClient();
          const newReview = await prisma.reviews.create({
            data: {
              rating: req.body.rating,
              reviewText: req.body.reviewText,
              reviewer: { connect: { id: parseInt(req?.userId) } },
              property: { connect: { id: parseInt(req.params.propertyId) } },
            },
            include: {
              reviewer: true,
            },
          });
          return res.status(201).json({ newReview });
        }
        return res.status(400).send("ReviewText and Rating are required.");
      }
      return res
        .status(400)
        .send("You need to purchase the property in order to add review.");
    }
    return res.status(400).send("userId and propertyId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
