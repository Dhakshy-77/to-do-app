Updates to Users

- Add isTrainer to the User model
- Update the AuthService so you can determine if the current user is a Trainer

Create Sessions

- This should be a repeat of everything done for Events on the BE
  - Properties (All are Required fields)
    - Name - string
    - Location (i.e. Room) - string
    - StartTime - date with time
    - Description - string
    - TrainerId - which User is the Trainer for this Session
    - EventId - which Event does this Session belong to
- Pages
  - Add
    - Only Trainers can add sessions. Be sure to use a guard
    - current user is assumed as Trainer
    - EventId should be handled via select and option html elements (aka standard html dropdown)
  - Info
    - Only the Trainer that made this Session can edit it. All other users coming to this page should have the form disabled and the save button removed.
  - List
    - Standard list
