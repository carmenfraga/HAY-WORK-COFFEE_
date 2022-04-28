module.exports = app => {

    //App Routes

    const index = require("./index.routes");
    app.use("/", index);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const apiRoutes = require('./api.routes');
    app.use("/api", apiRoutes);

    const coffeeRoutes = require('./coffees.routes');
    app.use("/", coffeeRoutes);

    const commentsRoutes = require('./comments.routes')
    app.use("/", commentsRoutes)

    const userRoutes = require('./user.routes')
    app.use("/", userRoutes)

    const userExperience = require('./user-experience.routes')
    app.use("/", userExperience)
}