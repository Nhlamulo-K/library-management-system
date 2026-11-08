# library-management-system

## Schema Decisions
Having two separate models for genre and book is a way of normalisation. The reason Book references Genre is because it shows relationships, which means one can retrieve books belonging to a specific genre. There is also less duplication, consistency and easier maintenance.