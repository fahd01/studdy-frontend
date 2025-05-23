## Integration
- course management -> 15.04 16:00
- blog management   -> 15.04 18:00
  - removed from angular.json styles array
```
              "node_modules/@fullcalendar/core/main.css",
              "node_modules/@fullcalendar/daygrid/main.css"
```


## Tasks
- [ ] Add logo to back offices
- [ ] Integrate About
- [ ] Integrate Contact
- [ ] Integrate admin dashboard
- Generic
    - [X] Title image is larger than it should be (compare with original template)
    - [ ] Clean footer
    - [ ] Use Studdy email for contact page and footer
- Course Management
    - Course Creation:
        - [X] Assign course category
    - Course List
        - [ ] Clicking on Level or Category on the course card filters by the clicked item
    - Course details
        - [ ] Add skills to learn
        - [ ] Add tags for: AI, Quiz, Certificate
        - [ ] Add enroll button
    - Course Content
      - [ ] Modules / lessons
        - Create
        - Assign to course
    - Course Enrollment
      - [ ] My (enrolled) courses
    - About page:
        - [ ] course, students, enrollment stats
        - [ ] enrollment link
        - [ ] Get in touch link -> to contact page
        - [ ] Update static content
    - Home
        - Home has insights from all features
            - [ ] Courses listing
            - [ ] Recent blogs
            - Categories
                - [ ] listing
                - [ ] See all link
    - AI
        - [Front-office]
            - Answer student questions (feed course context to LLM)
        - [Back-office]
            - Generate Course thumbnail
            - Quiz generation
            - Content Generation


## Validation
- [X] Template integration (Front / Back)
- [X] Add (Course, Category)
- [X] Update (Course, Category)
- [X] Delete (Course, Category)
- [X] Controle saisie (Course, Category: Create / Edit)
- [X] Affichage:
    - Courses: cards view (Front-office) and table view (back-office)
    - Course details
    - Category: Table view (back-office)
- [X] Filtering: courses filtering by category, level and free fuzzy search in title and description
- [X] Pagination: Courses cards view (Front-office)
- [ ] Jointure
  - Course / Category
