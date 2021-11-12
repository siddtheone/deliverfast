require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const faker = require("faker");

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/api/login", (req, res) => {
  const user = users.find(
    ({ username, password }) =>
      username === req.body.username && password === req.body.password
  );

  if (user === undefined) {
    res.sendStatus(403);
  }

  const { password, ...restUserInfo } = user;

  jwt.sign({ user: restUserInfo }, process.env.JWT_KEY, (err, token) => {
    res.cookie("Authorization", `${token}; HttpOnly; SameSite=Lax`);
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Origin", "http://localhost:3001");
    res.sendStatus(200);
  });
});

app.post("/api/createParcel", verifyToken, (req, res) => {
  const parcel = createParcel({
    senderId: req.user.id,
    ...req.body,
    status: "CREATED",
    pickUpTime: null,
    dropOffTime: null,
    bikerId: null,
  });
  parcels.push(parcel);
  res.json(parcel);
});

app.get("/api/parcels/:senderId", verifyToken, (req, res) => {
  res.json(parcels.filter(({ senderId }) => senderId === req.params.senderId));
});

app.get("/api/bikersParcels/:bikerId", verifyToken, (req, res) => {
  res.json(
    parcels.filter(
      ({ bikerId }) => bikerId === req.params.bikerId || bikerId === null
    )
  );
});

app.put("/api/updateParcel", verifyToken, (req, res) => {
  const { id, pickup, dropoff } = req.body;
  let parcel;

  if (pickup) {
    for (let i = 0; i < parcels.length; i++) {
      if (parcels[i].id === id && parcels[i].bikerId === null) {
        parcels[i].pickUpTime = pickup;
        parcels[i].bikerId = req.user.id;
        parcels[i].status = "PICKUP";
        parcel = parcels[i];
        break;
      }
    }
  } else {
    for (let i = 0; i < parcels.length; i++) {
      if (parcels[i].id === id && parcels[i].bikerId === req.user.id) {
        parcels[i].dropOffTime = dropoff;
        parcels[i].status = "DROPOFF";
        parcel = parcels[i];
        break;
      }
    }
  }

  if (!parcel) {
    res.sendStatus(400);
  }

  res.json(parcel);
});

app.listen(port, () => console.log(`Server started on port ${port}`));

function verifyToken(req, res, next) {
  const bearerCookie = req.cookies["Authorization"].split("; ");
  if (typeof bearerCookie !== "undefined") {
    const bearerToken = bearerCookie[0];

    jwt.verify(bearerToken, process.env.JWT_KEY, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = authData.user;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

function generateUsers(count, type = "biker") {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: uuidv4(),
      username: `${type}_${i}`,
      password: `logout${i}`,
      type,
    });
  }
  return users;
}

function generateParcels(count) {
  const parcelCollection = [];
  for (let i = 0; i < count; i++) {
    parcelCollection.push(
      createParcel({
        senderId: faker.helpers.randomize(senders.map((s) => s.id)),
        name: faker.commerce.productName(),
        pickup: faker.address.cityName(),
        dropoff: faker.address.cityName(),
        createdTime: faker.date.past().toISOString(),
        status: "CREATED",
        pickUpTime: null,
        dropOffTime: null,
        bikerId: null,
      })
    );
  }
  return parcelCollection;
}

const createParcel = (override) => ({
  id: uuidv4(),
  ...override,
});

const bikers = generateUsers(10);
const senders = generateUsers(5, "sender");
const users = [...bikers, ...senders];
const parcels = generateParcels(50);
