# SQL Column Renamer

This tool automates renaming snake_case database columns to lowerCamelCase columns.
It generates [Doctrine 2](https://www.doctrine-project.org/projects/orm.html) migrations which can be run using PHP project with Doctrine 2 installed.

## How to use ##
1. Run `npm install` in the directory
2. Launch the application using `npm run start`
3. Generate DDL of the whole database or only of those tables whose columns should be renamed.
4. Copy and paste the DDL into the text area on the left.
5. If the DDL is correctly parsed, migration code will appear on the left side of the app.
6. Create a file in migrations folder of your project with the same name as the generated class and with the `.php` extension.
7. Copy and paste the generated code into a file.
8. Check the code in the migration file.
9. Now you can execute the migration.
