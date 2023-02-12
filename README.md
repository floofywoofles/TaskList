# Tidy
A simple CLI todo-list for the terminal

# Commands
- add [title] [priority]
  - Adds an item to the todo list
- remove [title or id]
  - Removes an item from the todo list
- change [title or priority] [title or id] [new title or new priority]
  - Changes an items title/priority
- search [title or id]
  - Search for an item by its title or id
  - Returns the id and title of an item

# Usage
``` bash
$ ts-node ./app.ts add "Finish Tidy" "high"

$ ts-node ./app.ts remove "Finish Tidy"

$ ts-node ./app.ts change title "Finish Tidy" "Work on Tidy"

$ ts-node ./app.ts search "Finish Tidy"
```