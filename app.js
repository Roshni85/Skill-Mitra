const express = require("express");
const mongoose = require("mongoose");
const Skill = require("./models/skill");
const Video = require("./models/videos");
const path = require("path"); // For serving static files
const methodOverride = require("method-override"); // For PUT & DELETE requests
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");

const app = express();

// 📌 Middlewares
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data
app.use(methodOverride("_method")); // For PUT & DELETE requests
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "views")); // Set views directory
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (CSS, JS, Images)

// 📌 Routes
app.get("/", wrapAsync(async (req, res) => {
    let skills = await Skill.find();
    res.render("home.ejs", { skills });
}));

app.get("/skills/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/skills", wrapAsync(async (req, res) => {
    const { name, description } = req.body;
    const skill = new Skill({ name, description });
    await skill.save();
    res.redirect("/");
}));

app.get("/skills/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError("Invalid Skill ID", 400));
    }
    const skill = await Skill.findById(id);
    if (!skill) {
        return next(new ExpressError("Skill not found", 404));
    }
    res.render("edit.ejs", { skill });
}));

app.put("/skills/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError("Invalid Skill ID", 400));
    }
    const { name, description } = req.body;
    await Skill.findByIdAndUpdate(id, { name, description });
    res.redirect("/");
}));

app.delete("/skills/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError("Invalid Skill ID", 400));
    }
    await Skill.findByIdAndDelete(id);
    res.redirect("/");
}));

app.get("/skills/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError("Invalid Skill ID", 400));
    }
    const skill = await Skill.findById(id).populate("videos");
    if (!skill) {
        return next(new ExpressError("Skill not found", 404));
    }
    res.render("show.ejs", { skill });
}));

// Videos routes
app.post("/skills/:skillId/videos", wrapAsync(async (req, res, next) => {
    const { skillId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        return next(new ExpressError("Invalid Skill ID", 400));
    }
    const { title, url, description } = req.body;
    const skill = await Skill.findById(skillId);
    if (!skill) {
        return next(new ExpressError("Skill not found", 404));
    }
    const video = new Video({ title, url, description });
    skill.videos.push(video);
    await video.save();
    await skill.save();
    res.redirect(`/skills/${skillId}`);
}));

app.delete("/skills/:skillId/videos/:videoId", wrapAsync(async (req, res, next) => {
    const { skillId, videoId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(skillId) || !mongoose.Types.ObjectId.isValid(videoId)) {
        return next(new ExpressError("Invalid ID", 400));
    }
    await Skill.findByIdAndUpdate(skillId, { $pull: { videos: videoId } });
    await Video.findByIdAndDelete(videoId);
    res.redirect(`/skills/${skillId}`);
}));

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message);
});

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});