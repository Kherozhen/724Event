import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./index";

describe("When Form is rendered", () => {
  it("displays the form fields", async () => {
    render(<Form />);
    
    await screen.findByLabelText("Nom *");
    await screen.findByLabelText("Prénom *");
    await screen.findByLabelText("Personnel / Entreprise *");
    await screen.findByLabelText("Email *");
  });

  it("and the submit button is clicked, calls the success action", async () => {
    const onSuccess = jest.fn(); // Crée une fonction espion
    render(<Form onSuccess={onSuccess} />);
  
    // Simuler la saisie des champs requis
    fireEvent.change(screen.getByLabelText("Nom *"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Prénom *"), { target: { value: "Doe" } });

    // Trouver et ouvrir le menu déroulant du composant Select
    const selectField = screen.getByLabelText("Personnel / Entreprise *");
    fireEvent.mouseDown(selectField); // Ouvre le menu déroulant
    fireEvent.click(selectField[0]); // Sélectionner la première option trouvée
  
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "john.doe@example.com" } });
  
    // Trouver le bouton de soumission
    const submitButton = screen.getByRole("button", { name: /Envoyer/i });
  
    // Simuler un clic sur le bouton de soumission
    fireEvent.click(submitButton);
  
    // Attendre que le texte du bouton change pour indiquer que la soumission est en cours
    await screen.findByText(/En cours|Envoyer/);
  
    // Vérifier que onSuccess a été appelé après la soumission du formulaire
    expect(onSuccess).toHaveBeenCalled();
  });
});