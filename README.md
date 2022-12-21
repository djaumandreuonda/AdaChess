Diego Jaumandreu Ondaro

# Advanced programming part 2

## Challenge outline

The challenge of this project is to create a chess game interface which will allow two players to play against each other, using all features and rules of the original game.

This includes:

- The display of an 8x8 board with black and white pieces
- Turn taking between black and white player (defined by valid moves)
- Ability to move pieces (each piece type will be limited to the moves it can take. E.g., bishop can only move diagonally)
- Ability to "eat/kill" enemy pieces
- In check, stalemate and checkmate functionality.
  - E.g., if in check, the player should only be able to move pieces that would stop their king from being in check
  - E.g., if in checkmate or stalemate, the game should stop and inform who won

### Approach to solution

#### Design - UML diagram

![text](https://github.com/djaumandreuonda/AdaChess/blob/main/Pictures/firstArchitecture.png)

This was the initial solution for the chess board. As in a real chess game there are clearly objects, I initially thought of taking an OOP approach to solve the problem of making chess into a game application.

In this diagram I breakdown the game into different objects. This is the un-edited lists of the objects I needed when first thinking about how to solve this problem:

- Game
- Player
- Board
- Boxes
- Pieces

After further consideration of my design, I decided to get rid of the player object. This is because it could be simplified into just a colour on that the game object can hold, and although players are the ones who technically make the moves, I decided it was going to be messy to pass information between a bunch of different classes when the game object can do this task.

I also created a coordinate class that would just hold the x and y coordinate of where the boxes are on the board. My rationale behind this was twofold:

1. **Pieces are in boxes:** on a draft design both piece and box referenced each other. Piece held what box it was on, and box held what piece was on top of. I realised this was a bad design so coordinate was born, an object both objects could store without cross referencing each other.
2. **Simplification:** I realised that by having a coordinate object that just held two attributes would take much less space than constantly sending the box object when making moves or checking for valid moves on the game class. By sending a reference of a piece or box it would simplify my solution and make the game (if it is evolved to a big application) run smoother.

Finally, type objects were born. I figured that an abstract piece does not have any move, and each type has a different range of moves it can take. This meant that a child class would need to be created so that it would return a range of moves it can take.

### Development strategy – an agile approach

Due to time constraints, a fully implemented chess game might not be possible. To address this problem, MVPs will be designed to define the scope of the project and create deliverables in case there is no time to create the final product. This is also particularly useful as I have never tried to solve this problem. Making it very hard to predict how long solving my original outcome will take, this approach makes it easier to plan towards a final goal and helps me investigate the problem.

This approach is considered an agile approach in which each MVP will be broken into requirements, design, development tasks and finally implemented. The benefit of doing this is that deliverables are made much faster allowing for flexibility if a requirement is not possible (e.g., discovered a limitation by making a prototype). Additionally, MVPs are clearly defined and much smaller than creating the whole application at once, which is much more motivating and easier to develop.

My approach to QA will be to conduct some unit testing using angular testing framework. After creating services/controllers on angular I will prioritise testing the most important methods and will attempt to test as much code as I can, especially those functions that cannot be tested visually (by playing the game).

In addition to this:

- I will not commit any code that contains any bug or that isn't finished. I will always commit code that is clean, the same applies to pull requests
- I will test any new function implemented visually

#### First MVP requirements

- A board will be displayed (the board will be made of box objects which can store pieces inside of them).
- The board should look like a chess board
  - Colours of boxes will alternate between each box (e.g., black & white)
  - There should be 64 boxes
- Upon starting the game black and white pieces should be displayed on the table at the right positions (define by chess rules).

_Note: this MVP does not define winning conditions and will not keep track of piece deaths, it is purely experimental to get familiarized with the problem at a lower complexity._

#### Second MVP requirements

- All requirements defined in the first MVP
- Players will be able to take turns (defined by moving a piece to a correct location)
  - A correct move is defined by the allowed moves a pawn can make in the rules of chess, this includes "eating" other pieces
  - To take a turn, a player must click on a box which contains one of their pieces (defined by the player's colour), and then they must click on a destination. If this destination is not allowed, this will not count as a move. If the move is correct, the piece will move to that position.
- Pieces will be able to move, each piece type should move according to the rules of chess
- King shouldn't move to a box if it means it will cause a check on said king
- Pieces should not move if it means it will cause a check on their king
- Pieces should not move if it means it won't stop an existing check on their king
- Game should recognise when there is a checkmate.
  - When checkmate recognised it should not allow players to move any piece
  - When checkmate recognised game should end
  - When checkmate recognised a message should be displayed of who won
  - When checkmate recognised it should let the user reset the game

_Note: this MVP will not include advanced functionality such as rooking or time constraints for the players. This will be introduced on the final MVP._

#### Final MVP requirements

- All requirements defined in the second MVP
- Advanced rules such as rooking, piece transformation and en passant will be implemented
- Timer settings will be available, as well as pause/resume functionality
- Beginner settings (from feedback)
  - Highlighting possible moves a player can make when clicking on a piece
  - Animation for informing user why they can't move a piece (e.g., move causes a check on your king)
  - Animation for killing other pieces
- Menu created (from feedback)
  - Menu allows to save a game
  - Menu can load previously saved games
  - Menu allows to turn off beginner settings

### Decomposition – epic style tasks

As the approach decided was going to be an agile methodology, I thought it would be better to break down the problem into "epic styled" tasks, a practice done when using agile.

To do this, I created a board on Trello which would breakdown my UML diagram and the MVPs into epics. Epics is a term used in agile which can be defined as a large body of work that needs further decomposition into smaller pieces of work called stories (stories can be broken down into tasks).

I broke down the entire application into epics, stories and tasks. Meaning that if all epics are complete, all MVPs would be complete.

#### The board

![](RackMultipart20221221-1-zqz06c_html_263a884b872bcc94.png)

Both JIRA and Trello were considered to create a sprint board, but after testing both applications I decided that Trello was a better match for my project as it was much more lightweight and easier to maintain than JIRA. JIRA could have been better for project that are much bigger than a chess game.

Trello's lists served the purpose to keep track of the state of stories. As seen in the picture above a backlog list was used to hold all stories that needed to be completed, as well as an "in progress" list to keep track of the stories I had started, and a "done" column to track my completed stories. The epics list was purely to keep track of the bigger picture of the application, but no card was meant to be moved from that list.

#### Epic example

A ![](RackMultipart20221221-1-zqz06c_html_a175829bd0a7a820.png) s mentioned earlier the whole application was broken down into epics, once all epics are completed, the full application has been completed.

Each epic holds a description of the requirements to complete the epic. It also has a list of possible stories it will need to complete said requirements, including a link to each story.
_Story example_

![](RackMultipart20221221-1-zqz06c_html_28ced41e43680bfe.png)Each story will be created from the list of stories in the corresponding epic.

A story will represent a requirement needed by an end user. This story was born by the ability for a player to move a piece on the board.

Note that stories also hold requirements to complete said story, a list of sub-tasks breaking down the story and tags such as the type of story it is (business logic vs front end) and a reference to the epic it relates to. (Move pieces functionality for this example)

### Preparation tasks & tests

Before starting to develop the first MVP I spent some time creating a very simple OOP solution of the game. The goal was to create an application that allows a player to move a pawn on a board without any display at all. This was done to get familiarised with the suggested architecture and test if the models designed would be viable.

The first task was to create the board, box and piece classes at a very basic level. The board object would have a single attribute to hold boxes, storing them on a 2D array. The biggest challenge at this stage was to create an algorithm that would generate a board with 64 boxes when instantiating the board, alternating the colour of the boxes like in the actual game of chess.

The next big task was to develop the pawn type. Although I initially thought of this as the easiest piece to implement, I quickly realised that the pawn would cause a lot of issues down the line. The first issue is that the pawn differentiates between eating and moving forward and is the only piece that does this. In addition to this, the black pawn and white pawns move differently. The white pawn only moves up and the black pawn only moves down.

#### Adoption and use of good standards

![](RackMultipart20221221-1-zqz06c_html_6d0a870c0fbd14f8.png)B ![](RackMultipart20221221-1-zqz06c_html_c241ab9e37f97c13.png) efore moving on to the next stage, I heavily tested the logic for the models. This is because I wanted to ensure there were not issues related to my model when trying to implement this solution in Angular and testing if I could achieve what was proposed for this project using this framework. These are some examples of unit tests performed:

To further ensure quality in my application, I moved to angular testing (on the next MVP) and made it a habit. I also made the following a habit:

- **Use consistent naming convention** and appropriate to the context
- **Comment code** that needs to be explained or is hard to understand, commenting code that can be understood by using a consistent naming convention (e.g. isValid(move) is clearly checking if a move is valid) would violate the DRY principle
- **Clean/review code after every 3-4 commits** , this is a useful habit to ensure I am simplifying my code ensuring everything written has a purpose. This is evidenced throughout my GitHub commits.

### First MVP

![](RackMultipart20221221-1-zqz06c_html_7db19bed7f7c788f.png)

#### Displaying the board

The application was moved to angular so that the game could be seen. I chose angular because I was somewhat comfortable using it, and I knew about an angular concept called "components", which combines a typescript and html file, which have both a visualisation and controller components and can "feed" off a data model. This was particularly useful as I wanted to create an MVC architecture. The idea was to first create a board component that could display itself by giving information to its children, box components. The board would auto generate these children in its constructor and assign a colour to each like it was done on the model.

To start with the display, I first started from the smallest component, the box. I did some tests feeding a box model from the board component and the box would have to display a box according to this information. This was the first attempt:

![](RackMultipart20221221-1-zqz06c_html_20bd04a395975bfb.png)

This was done using an angular pattern called "input" which allows a developer to pass data from a parent component to its child component(s) via the html, making it very easy to implement and suitable for my architecture.

![](RackMultipart20221221-1-zqz06c_html_37203b9697866514.png)Then I used an angular loop through iterate through each box in the board component and try to display them. To ensure this was being done via the input parameter, I also displayed the coordinate of the box:

![](RackMultipart20221221-1-zqz06c_html_2ebabeae335e3e02.png)
 I then used some CSS classes to structure the boxes into a chess board

The piece component was then created. It was a class that inherited from the piece model and there was meant to be one per type but only the pawn was created. Upon instantiation it would use font awesome icons to display itself and by using angular input it would display the correct colour. However, this solution was erased as it created a lot of complexity. If I wanted to pursue this architecture, I would've needed to create 6 components (1 per piece type) and have them implement logic to understand where they were on the board and were to move (following my first architecture diagram). This is a bad practice as it would heavily combine a controller and a visual component as well as having to communicate data that could've been kept at the level of the game controller rather than passing it down.

I simplified this solution and decided that box would display icons depending on the data given to it by its parent:

T ![](RackMultipart20221221-1-zqz06c_html_8665aeba19e0ebdb.png) his HTML displays different icons depending on the values stored in box model by using "ngIf" which behaves as an if statement for HTML. If the box mode is empty the application won't display a piece inside the box, and it won't return an error.

This is a good solution as it prevents the usage of 6 extra components and displays different pieces depending on the data given to it.

##### Evaluation of solution and refactoring

However, there are some weaknesses with this solution.

The main issue is that core game logic is tied into the view template, so if a CSS style is updated/changed the entire game could potentially get broken as the pieces might not get displayed. In addition to this, the box is re-rendered every time a player clicks a box or moves a piece. This means that the ngif statements would be triggered a lot of times during a game of chess as a game of chess constantly requires a player to click on boxes, on top of this, there are 18 ngif statements on the template. This can potentially affect the performance of the game and thus not a good practice (it breaks the DRY principle). The current game is quite small and thus unlikely to affect performance but if I want to further develop my game and make the project bigger (e.g., implementing a multiplayer online version) this could become a huge impact to the game's performance.

**Fixing the issue:**

This issue was fixed on later MVPs, but it will be explained here for convenience.

The html was simplified to a single ngif statement. Instead of hard coding the data the font awesome statement needed I made it an attribute of the class.

![](RackMultipart20221221-1-zqz06c_html_6b39938e3072a3c2.png)

This was done with the help of Angular's "Observable", a design pattern very similar to the observer pattern, in which a subject maintains a list of their observers and notifies them of state changes. These changes can be used to trigger functions or events.

In this example, I created a subject in the box model, this subject value is updated every time there is a change to the box model. For example, when a box is emptied, or a piece is added to it:
 This change of event will notify the box component (the object responsible for the view of this model) which will update the values of the display every time a change is detected. Instead of "if statements" constantly checking for changes on the box model to decide what piece to display, this solution allows an update on the box (of a single html line) only when a change happens on the box model the component is currently displaying, by updating its attributes and giving them to a font awesome icon which will change depending on the piece held in data.

![](RackMultipart20221221-1-zqz06c_html_4225c157bddc7473.png)This is the box model (subject):

![](RackMultipart20221221-1-zqz06c_html_cfd3fcfb70a231d4.png)This is the box component (obvserver):

#### Emitting coordinates and a new architecture

After having a board displayed with correct pieces, I wanted to take it a step further and make the board "smart". I wanted to test how I could pass data from a box to its parent, board, and I also wanted to create the main controller, the game component, that would control the logic for the complete game (such as the turns and states).

This is the algorithm I designed for the game component to follow:

![](RackMultipart20221221-1-zqz06c_html_e2afe18ddb133266.png)

![](RackMultipart20221221-1-zqz06c_html_f3d3b797f717de33.png)

At this stage a new architecture was created, based on an MVC architecture, which separates classes into different concerns. The board model only stores data about the board, it doesn't have any logic or any view component to it. The view classes should only display data based on a model, if the model changes (maybe due to controller class changes) the view should also change, and the only logic these classes should hold should be regarding display. Finally, the controller classes should only carry out logic on the board component, such as validating moves, and they should not be concerned with the display of data.

To communicate coordinates between components I used the inverse of "Inputs" called "Outputs", which is a way to send data from a child component to its parent component. When clicking on the box's html, a function, "sendCoordinate()" would emit the box's coordinates to its parent component:

![](RackMultipart20221221-1-zqz06c_html_999936b84acb3c6c.png)

The parent would "listen" to this via their HTML which would then call a function to register the coordinates, which would console log them:

![](RackMultipart20221221-1-zqz06c_html_d42234cc7468bf20.png)

![](RackMultipart20221221-1-zqz06c_html_97fce8a0e018cad6.png)

The board would then pass this information to its parent component, the game controller, which could now listen to player's inputs.

To finalise this MVP, I created a "skeleton" of the flowchart proposed for the game component so that it was ready for further development during the next MVP. Once a player clicked on a box in which one of their pieces was placed, it would change the state of the game to "attempt move", go to a switch case statement for the piece selected displaying "storing possible moves for {piece}" on the console and wait for the next click. Once the player clicked on the board, the move was automatically invalid, and the state was changed back to "await".

##### Evaluation of the solution and refactoring

The problem with using "output" to emit coordinates is that this cannot be directly communicated to a component that is not within the "family structure". For example, box component is not able to share this information with potential siblings, children or external components. _It can only communicate them with their parents._

The game component was the component that would ultimately use this information (box's grandparent) meaning I had to first pass the coordinate to board, which was then sent to game (board's parent). This breaks the DRY principle, and it is a very inflexible way of communicating information as it would not allow communication for new components that might be created in the future.

**Fixing the issue:**

To solve this problem, I used the observer pattern. This time, I made "updateBoard" the subject:

![](RackMultipart20221221-1-zqz06c_html_e55f8a8b0e783174.png)

Update board service is an external component (not part of the grandparent, parent, child flow) and thus any component can subscribe to the "gameMoveUpdate" attribute.

If a box was clicked, it would send its coordinates to this subject:

![](RackMultipart20221221-1-zqz06c_html_9720f8ecab848cf6.png)

On the other hand, game component would listen to any changes and consume the value changed and run some logic:
 ![](RackMultipart20221221-1-zqz06c_html_304b8b486ed8f49d.png)

This code is listening to coordinates from the subject and calling registerCoordinate function to start the flow chart logic displayed earlier on this section. Depending on the state of game, it would consider coordinates as clicking a piece or an attempt to move a piece.

This is what the MVP looked like after this change:

![](RackMultipart20221221-1-zqz06c_html_cf04ac8f234f100c.png)

### Second MVP

The next stage was to implement the moving functionality. The solution for movement is split in two parts, shown on the flow diagram.

1. The piece needs to get the available moves it can do
2. If the coordinate the player wants to move to it is within those available moves, then the board model should be updated with the piece on its new location

At this stage I also needed to define ending conditions for the game.

#### Available moves – key design challenge

The initial solution was that once a player clicks on one of their pieces, it would instantiate the piece type it is. This piece would understand where it is on the board and return the appropriate moves it could take.

However, there were a lot of weaknesses with this solution. Instantiating a new piece every time would cause the application to become heavier and heavier, especially because this piece needs to understand where it is on the board and understand where other pieces are to know if it can move there.

Instead, after researching a variety of solutions, I decided to use angular services which are objects that get instantiated just once during the lifetime of the application (they are singletons). My rationale for this was twofold, but there are a lot more benefits:

1. This solution creates high cohesion. All logic regarding getting possible moves is tied to this service only, instead of creating 6 pieces that could give information about the possible moves they can take, check the validity of the moves and move.
2. Singletons only get instantiated once during the lifetime of an application which fulfils the DRY principle as this class only needs to be instantiated once and is going to be used by different classes.

This singleton would hold all the different algorithms for each piece movements and return a list of available moves (coordinates) based on the coordinate of said piece and a board model.

![](RackMultipart20221221-1-zqz06c_html_27b10166cb9afcac.png)

#### Update board service

I created another service to update a board model with a move that has been validated.

It takes an old coordinate, a new coordinate and a board. It moves any piece located on the old location to the new location and returns the updated board model.

![](RackMultipart20221221-1-zqz06c_html_97afb56bf1ca5178.png)

#### Validating moves

Currently the only validations for moves are checking piece can take that move by calling the available-moves service, but there was still a lot of validation left to do due to chess rules.

A piece that was seemed very easy to make was the king. In theory, it can move in all directions but just one box at a time as shown in the picture below:

![](RackMultipart20221221-1-zqz06c_html_92a273c54c3dcc6c.png)However, in chess there are more rules to the movement of the king. A king cannot move to a place it would be in check, it is an illegal move. Meaning that my program cannot let a player, even if it is a foolish move, move a king to a position in which it would get eaten/killed.

In addition to this, I added extra validation to prevent other illegal moves such as:

- A player cannot move a piece if it means the check of your king (including your king as mentioned earlier)
- If their king is in check a player cannot move a piece that won't stop their king from being in check

To check if the king would get in check after doing a move (or is in check already), a function (isKingInCheck) would take a king position and a board and iterate through all the enemy moves by reusing the available moves service and checking if the king is in any of those position (meaning it could potentially get eaten by some of those pieces).

To do this, a new service was introduced, the helper service, designed with methods to fulfil with the DRY principle as they are used frequently throughout the application. This service has 3 functions:

A ![](RackMultipart20221221-1-zqz06c_html_5edcdda1db91e8c6.png) function to switch the colour from white to black and vice versa, mainly used to switch the colour when getting the enemy's moves (e.g. getOppositeColour(this.turn).

Another method was created to check if a coordinate was inside an array of coordinates, used to check if king position is in the array of possible enemy moves, or checking if a coordinate is in the array of possible moves for that piece.

A final method was created to deeply clone a board's model object. This was born out of a need to "simulate" moves on the move validation, explained in more detail later.

With the help of all these services, the final isValid function method was born:

![](RackMultipart20221221-1-zqz06c_html_aaf903ff4c0b4fab.png)

It first checks if a piece can take the move it is trying to take. Returns false automatically if this is not the case.

Then, using the help of the clone board function, it clones the board model to create a "mock board" which is used to replicate the move that is being attempted by using the update board service. The mock board is given to the update-board service, so that the move the player is attempting is reflected on a board mode. Then, the isKingInCheck function is used to check if that move would cause their king to be in check.

During this period, there were a lot of logic errors. Mainly caused by not being rigorout enough when testing functions. After being stuck for long periods of time, I decided to thoroughly test the helper functions because if they didn't work as expected by themselves (unit tests) then they could cause a lot of issues which were going to be hard to debug.

A ![](RackMultipart20221221-1-zqz06c_html_c5671b93c8e98aa7.png) fter creating unit tests for each function, I caught a lot of logic errors on the functions. For example, isInArray always returned false as it was not comparing the objects correctly, this was fixed by comparing the attributes of the object rather than the object itself.

#### End game conditions

In chess there are two ways a game can finish:

- One of the players is in checkmate, meaning their king is in check and they can't do any move that would stop it
- There is a stalemate, meaning a player cannot make any move (as their king would be in check) but the king is not in check yet.

I translated these rules into pseudocode:

- A player has no valid moves left and their isInCheck(their king) is true
- A player has no valid moves left

The solution I came up for is to create a function that would check if there a stalemate is present on the current model board for the current turn.

To do this, the function goes through all the pieces for the player whose turn is occurring and checks if they are valid moves, if a valid move is detected then it automatically returns a false, saving checks on the rest of the pieces, which improves performance. If there are no valid moves left, it must mean there is a stalemate, so it returns a true.

![](RackMultipart20221221-1-zqz06c_html_95e3e0b460c5dd0.png)

Combined with "isKingInCheck" function, I could now identify a stalemate and a checkmate.

To officially finish the game, I needed a modal that would display once a checkmate or stalemate was detected and show the correct information. The best solution I found was to use a bootstrap modal on its own angular component. This way I could pass information to it, such as the display message or even other data such as game stats.

![](RackMultipart20221221-1-zqz06c_html_e6e4ce4dc1883a06.png)

This is the function that opens the modal:

![](RackMultipart20221221-1-zqz06c_html_65c56ddb70c1a086.png)

##### Refactoring the solution

IsInStalement heavily depends on other functions. It uses the availableMoves service, isValidMove and isInCheck.

During the development of this function, I ran into many logical errors because the rest of the functions were not pure. For example, isValidMove heavily relied on the game class's attributes meaning that it could only be used for one purpose, to check valid moves during the game. To fix this, I decided to reduce the use of "this." on functions so that the function only "depended" on its parameters and not on any state of the application. This solved many problems as this meant the isValid function could be used as a service function, thus could be used to check valid moves on "mockboards" or hypothetical scenarios rather than at runtime. This helped a lot when developing the stalemate function.

## Evaluation

### Code smells

I have explained some code smells and how they were fixed throughout the document, I'll add a couple more examples in this section that were not mentioned before.

Deficient encapsulation was a very common code smell on my application. This can be seen during my available service explanation in which I changed the code so that each individual "endpoint" could not be called without accessing the gateway function first (getMoves()) by making each call private.

However, the biggest example of this smell was on my box model class. In chess a box should not hold more than one piece at a time. To store the pieces on the objects I used an array, but arrays don't have a limit of pushes meaning I could add two pieces if I wanted to. In fact, some algorithms used "box.pieceArray.push()" which led to a lot of errors as more pieces could be added to a box, this was especially important on loop based algorithms such as isKingInCheck or the stalemate function.

To fix this, I made the array private and only allowed access through the box's methods like so:

T ![](RackMultipart20221221-1-zqz06c_html_879f9e93b56d2f1.png) his was also the main reason I needed to use observable solution mentioned for the box display, as angular's ngOnChanges (a feature that picks up on any change done on the model) was not working. This was because the changes were occurring through the methods so ngOnChanges couldn't pick this up.

### Opportunities to grow

To fully test the application, I asked 6 stakeholders to play against each other using my application.

**Robust testing:** The first 5 games acted as "robust testing" as the stakeholders were asked to attempt illegal moves and try to break the application.

**Results:** there were no errors displayed on the console, and no illegal move was performed. There was also no logical errors such as double turns or not being able to move a piece despite it not causing a check. This was very positive.

**User testing:** The final 5 games were "normal" games of chess. Using the standard rules except advanced features such as rooking which were not in the scope of the second MVP.

**Results:** once againvery positive results. Some games lasted up to 50 minutes and the players were intermediate players, during this time there were no blocking errors, they were able to play without interruptions, and there were no logical errors.

#### Feedback

During these games I gathered a lot of feedback that could be used to advance my application.

**Advanced features:** some users wanted to use some advanced moves such as rooking. However, there was never an option to use en-passant as it is a quite rare move, same with pawn transformation, though pawn can transform to queen only.

To further improve the game, the following features would need to be implemented:

- Rooking detection
- En-passant detection
- Create a ui that allows user to choose a piece to transform to once "pawn transformation" is detected. To do this a new component would need to be built (or re-using the modal component) which would display different pieces and allow the user to click on one.

**Highlighting moves:** some players struggled knowing if they had clicked on a piece as there is no feedback for this. Some of them struggled moving pieces because of this. An improvement for this could be to highlight the box that is clicked once "selectPiece" function (the function responsible for validating a player is clicking on their pieces) has returned true. This could be done by updating the board model and adding an extra attribute or to create another observable event to the box and subscribe to this once a player has clicked on their piece, causing the box's margin to change in colour.

**Beginner settings:** some beginner players used the application. As the application lacks user feedback, some got slightly frustrated when trying to make moves they were not allowed to. I thought it would be a good idea to introduce beginner settings based on this feedback. These are some of the features that could be implemented:

- Highlighting possible moves a player can make when clicking on a piece
- Animation for informing user why they can't move a piece (e.g., move causes a check on your king)
- Animation for killing other pieces

However, I understand some of these features could upset more advanced players. To deal with this issue a menu could be created that allows beginner settings to be turned on/off.

The menu could also allow players to save a game, a board model could be saved and then loaded by the board model to display a previously saved game instead of instantiating a new board. A UI would be needed to be created.
