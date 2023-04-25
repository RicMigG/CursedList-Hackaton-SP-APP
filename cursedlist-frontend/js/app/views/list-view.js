define(function () {
  var internals = {};

  var externals = {};

  internals.createEventHandlers = function () {
    // Event Handler for login with ID or create new Session with name.
    $("#entername").click(() => {
      if (
        $("#labelTypeIDX").text() == "Please insert your ID (previous session)"
      ) {
        $("#labelTypeIDX").text("Please insert your Name (new session)");
        $("#entername").text("Enter with your ID!");
      } else {
        $("#labelTypeIDX").text("Please insert your ID (previous session)");
        $("#entername").text("Enter with your Name!");
      }
    });

    // Event Handler for login button
    $("#loginbtn").click(() => {
      // Validate input
      if (
        $("#labelTypeIDX").text() ==
          "Please insert your ID (previous session)" &&
        isNaN(Number($("#typeIDX").val()))
      ) {
        alert("Insert a valid ID (Integers only!)");
      } else if (
        $("#labelTypeIDX").text() == "Please insert your Name (new session)" &&
        !isNaN(Number($("#typeIDX").val()))
      ) {
        alert("Insert a valid name (characters only!)");
      } else if (
        $("#labelTypeIDX").text() == "Please insert your ID (previous session)"
      ) {
        internals.value = $("#typeIDX").val();
        fetch("https://cursedlist-spring-backend.onrender.com/get-all-records")
          .then((Response) => Response.json())
          .then((Response) => {
            for (let i = 0; i < Response.length; i++) {
              if (Response[i].pid == internals.value) {
                internals.pname = Response[i].pname;
                window.location.hash = "list";
                return;
              }
            }
            alert("USER NOT FOUND: Insert valid ID or enter with your name!");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        $("#labelTypeIDX").text() == "Please insert your Name (new session)"
      ) {
        internals.pname = $("#typeIDX").val();
        fetch("https://cursedlist-spring-backend.onrender.com/get-all-records")
          .then((Response) => Response.json())
          .then((Response) => {
            internals.value = -1;
            for (let i = 0; i < Response.length; i++) {
              if (Response[i].pid > internals.value) {
                internals.value = Response[i].pid;
              }
            }
            internals.value = internals.value + 1;
            window.location.hash = "list";
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.hash = "list";
      }
    });
  };

  internals.injectHtmlLogin = () => {
    $("#mainsection").empty();
    $("#mainsection").html(`
        <img src="img/login_background.jpeg" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;" />
        <div class="mask d-flex align-items-center h-100">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">
      
                      <div class="mb-md-5 mt-md-4">
      
                        <img src="img/ursula_img.png" alt="Ursula" class="img-fluid mb-4">
                        <h2 class="fw-bold mb-2 text-uppercase">Cursed List</h2>
      <p class="text-white-50 mb-5">Where either you do or you suffer!!!</p>
      
                        <div class="form-outline form-white mb-4">
                          <input type="text" id="typeIDX" class="form-control form-control-lg" />
                          <label id="labelTypeIDX" class="form-label p-2" for="typeIDX">Please insert your ID (previous session)</label>
                        </div>  
                        <button id="loginbtn" class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
      
                      </div>
      
                      <div>
                        <p id="accountasking" class="mb-0">Having issues? <a id="entername" href="#main" class="text-white-50 fw-bold">Enter with your name!</a>
                        </p>
                      </div>
      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
  };

  internals.populateTable = function (id) {
    $("#tableBody").empty();
    if (id != null) {
      fetch(
        "https://cursedlist-spring-backend.onrender.com/get-records-by/" + id
      )
        .then((Response) => Response.json())
        .then((Response) => {
          for (let i = 0; i < Response.length; i++) {
            if (
              Response[i].completed === "" ||
              Response[i].completed.toLowerCase() === "y"
            ) {
            } else {
              $("#tableBody").append(`<tr class="fw-normal">
                        <th>
                          <p>${Response[i].id}</p>
                        </th>
                        <td class="align-middle">
                          <p>${Response[i].task}</p>
                        </td>
                        <td class="align-middle">
                          <p>${Response[i].curse}</p>
                        </td>
                        <td class="align-middle">
                        <p>${Response[i].date}</p>
                        </td>
                        <td class="align-middle">
                        <button id="btntaskID.${Response[i].id}" type="button" class="btn btn-success">Done?</button>
                        </td>
                      </tr>`);
            }
          }
          $(".btn-success").click(async (Event) => {
            let targetID = Event.target.id.split(".")[1];
            await fetch(
              "https://cursedlist-spring-backend.onrender.com/mark-completed/" +
                targetID,
              {
                method: "PUT",

                body: JSON.stringify({
                  completed: "Y",
                }),

                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );
            internals.populateTable(internals.value);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  externals.render = function () {
    internals.injectHtmlLogin();
    internals.createEventHandlers();
  };

  internals.doTablePagePreparation = () => {
    $("#mainsection").empty();
    $("#mainsection").html(`
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-12 col-xl-10">
              <div class="card mask-custom">
                <div class="card-body p-4 text-black">
                  <div class="text-center pt-3 pb-2">
                    <img src="/img/desp8yd-8100a367-9071-48a3-983f-1318043da6de-removebg-preview (1).png"
                      alt="Check" width="230">
                    <h2 id="abcdef" class="my-4">Welcome to your Cursed List... ${internals.pname}!</h2>
                    <h4>Your id is #${internals.value}</h4>
                  </div>
                  <table class="table text-black mb-0">
                    <thead>
                      <tr>
                        <th scope="col"><div class="d-flex justify-content-start p-3">
                        <button id="goBackBtn" type="button" class="btn btn-info text-left">↺ Back</button>
                      </div>Task ID
                        </th>
                        <th scope="col"><div  class="form-outline p-3">
                        <input placeholder="New task" id="inputTask" type="text" id="form1" class="form-control" />
                      </div>Task Description</th>
                        <th scope="col">
                      Curse</th>
                        <th scope="col"><div class="form-outline p-3">
                        <input id="inputDate" placeholder="What's the end date?" type="date" id="form1" class="form-control" />
                      </div>
                        End date</th>
                        <th scope="col"><div class="d-flex flex-row-reverse bd-highlight p-3"><button id="addTaskBtn" type="button" class="btn btn-primary">Add Task</button></div>
                        Actions</th>
                      </tr>
                    </thead>
                    <tbody id="tableBody">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
  };
  internals.createEventsTablePage = () => {
    $("#addTaskBtn").click(async () => {
      if ($("#inputTask").val() == "" || $("#inputDate").val() == "") {
        alert("Please fill both the task and date fields!");
      } else {
        let listOfCurses = [
          "May your voice crack like Ursula’s when she tried to sing ’Part of Your World.’",
          "May you be transformed into a tiny, pathetic worm like Ursula was at the end of the movie.",
          "May your hair turn into a tangle of tentacles like Ursula’s.",
          "May you suffer the same fate as Ursula and be impaled by a ship’s prow.",
          "May you be cursed with an insatiable hunger for human souls like Ursula’s eels, Flotsam and Jetsam.",
          "May your skin turn as gray and slimy as Ursula’s.",
          "May your laugh sound like Ursula’s evil cackle.",
          "May you be as unattractive and unpopular as Ursula, with only a few minions to do your bidding.",
          "May you be banished to a dark, underwater lair like Ursula’s.",
          "May your teeth be as sharp and menacing as Ursula’s.",
          "May your voice be as scratchy and menacing as Ursula’s.",
          "May your cooking taste as terrible as Ursula’s ‘Poor Unfortunate Souls’ soup.",
          "May you be as clumsy and bumbling as Ursula’s eels.",
          "May your wardrobe consist entirely of Ursula-inspired purple and black.",
          "May you be cursed to never find true love like Ursula’s desire for King Triton’s power.",
          "May you be as obsessed with power as Ursula.",
          "May your magic be as weak and pathetic as Ursula’s.",
          "May your fate be as tragic as Ursula’s, with your plans foiled and your minions destroyed.",
          "May your ambition lead you to the same end as Ursula’s, with your greed ultimately being your undoing.",
          "May your beauty fade as quickly as Ursula’s when she transformed into Vanessa.",
          "May you be as unpopular as Ursula was with her fellow sea creatures.",
          "May you be as selfish and manipulative as Ursula, always putting your own desires above others.",
          "May you be as desperate and cunning as Ursula, always looking for ways to gain more power.",
          "May your plans always be as ill-fated as Ursula’s attempt to overthrow King Triton.",
          "May your minions be as incompetent and useless as Ursula’s eels.",
          "May your evil schemes be as obvious and easily thwarted as Ursula’s.",
          "May you suffer the same fate as Ursula’s poor, unfortunate souls who failed to fulfill their end of the bargain.",
          "May your name be forever synonymous with failure and defeat, like Ursula’s.",
          "May you be as easily defeated as Ursula, with all your plans crumbling at the slightest setback.",
          "May your demise be as satisfying and just as Ursula’s, with your own greed and treachery being your downfall.",
        ];

        let randomNumber = Math.round(Math.random() * 30);
        let chosenCurse = listOfCurses[randomNumber];
        await fetch(
          "https://cursedlist-spring-backend.onrender.com/add-record",
          {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
              task: $("#inputTask").val(),
              curse: chosenCurse,
              date: $("#inputDate").val(),
              completed: "N",
              pid: internals.value,
              pname: internals.pname,
            }),

            // Adding headers to the request
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        $("#inputTask").val("");
        $("#inputDate").val("");
        internals.populateTable(internals.value);
      }
    });
    $("#goBackBtn").click(() => {
      window.location.hash = "main";
    });
  };

  externals.doTablePageRender = () => {
    internals.doTablePagePreparation();
    internals.populateTable(internals.value);
    internals.createEventsTablePage();
  };

  externals.getUserNameOrID = () => internals.value;

  return externals;
});
