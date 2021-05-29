exports.up = function(knex) {

  // Birds table
  // .increment() it's the id increment
  return knex.schema
    .createTable('birds', tbl => {
      tbl.increments(); // 'id' field. birds.id. PrimaryKey <--
      tbl.text('common_name', 125).notNullable();
      tbl.text('scientific_name', 125);
      tbl.string('description', 500);
  })
    // Watchers table
    .createTable('birdwatchers', tbl => {
      tbl.increments(); // 'id' field
      tbl.text('watcher', 125).notNullable().index();
      tbl.string('observation', 500).notNullable();

      // Foreign Key info to 'birds' tables
      // Child tables can't exist by himself, has to be connect with a PK of a "Mother table"
      tbl.integer('bird_id') // 1) We connect to child tables with this FK
         .unsigned()  // Can't be a negative number
         .notNullable()
         .references('id') // 2) Reference the 'id' field
         .inTable('birds') // 3) In this table
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('birdwatchers').dropTableIfExists('birds') 
};


