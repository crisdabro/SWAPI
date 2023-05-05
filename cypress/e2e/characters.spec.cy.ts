describe("swapi cliente", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("https://swapi.dev/api/people/").as("getCharacters");
    cy.wait("@getCharacters").its("response.statusCode").should("eq", 200);
  });

  it("renders all characters", () => {
    cy.get('[data-testid="character"]').should("have.length", 10);
  });

  it("shows character details on click", () => {
    cy.get('[data-testid="character"]').first().click();
    cy.contains("Luke Skywalker");
    cy.contains("Stats");
    cy.contains("Height");
    cy.contains("Mass");
    cy.contains("Hair");
    cy.contains("Skin");
    cy.contains("Eyes");
    cy.contains("Birth");
    cy.contains("Gender");
    cy.contains("Planet");
    cy.contains("Starships");
  });

  it("should navigate to planet from character bio", () => {
    cy.get('[data-testid="character"]').first().click();
    cy.get('[data-testid="planet"]').first().click();
    cy.contains("Tatooine");
    cy.contains("Stats");
    cy.contains("Climate");
    cy.contains("Gravity");
    cy.contains("Terrain");
  });

  it("should toogle favorite on click", () => {
    cy.get('[data-testid="favouriteCharacter"]').should("have.length", 0);
    cy.get('[data-testid="favourite-icon"]').first().click();
    cy.get('[data-testid="favouriteCharacter"]').should("have.length", 1);
    cy.get('[data-testid="favourite-icon"]').first().click();
    cy.get('[data-testid="favouriteCharacter"]').should("have.length", 0);
  });
});
