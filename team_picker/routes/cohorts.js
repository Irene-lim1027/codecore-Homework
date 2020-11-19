const express = require('express');
const router = express.Router();
const knex = require("../db/client");

router.get('/', (req, res) => {
    knex("cohorts")
        .orderBy("createdAt", "DESC")
        .then(data => {
            res.render("index", {
                cohorts: data
            });
        });
});

router.get('/new', (req, res) => {  
    res.render("new") 
});

router.get('/home', (req, res) => {  
  res.render("welcome") 
});


router.post("/", (req, res) => {
    knex() 
      .insert({
        name: req.body.name,
        members: req.body.members,
        logo_url: req.body.logo_url 
      })
      .into("cohorts")
      .returning("*")
      .then(data => {
          console.log(data);
        res.redirect(`/cohorts`);
      })
  });

router.get("/:id", (req, res) => {
    knex("cohorts")
        .where("id", req.params.id)
        .first() 
        .then(data => {
        if (data) {
            res.render("show", { 
                cohort: data,
                options: req.query,
                teamList: teamList(data.members, req.query.method, req.query.quantity)
            });
        } else {
            res.send(`Cannot find team with id: ${id}`);
        }
    });
});

router.get("/:id/edit", (req, res) => {
        knex("cohorts")
            .where("id", req.params.id)
            .first() 
            .then(data => {
                res.render("edit", { 
                    cohort: data
                });
        });
    });

router.delete("/:id", (req, res) => {
    knex("cohorts")
      .where("id", req.params.id)
      .del()
      .then(() => {
        res.redirect("/cohorts");
    });
});

router.put("/:id", (req, res) => {
    knex("cohorts")
      .where("id", req.params.id)
      .update({
        name: req.body.name,    
        members: req.body.members,
        logo_url: req.body.logo_url 
      })
      .then(() => {
        res.redirect("/cohorts");
    });
});

module.exports = router;