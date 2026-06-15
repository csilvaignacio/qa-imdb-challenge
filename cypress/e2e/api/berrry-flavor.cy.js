/// <reference types="cypress" />

const BASE = Cypress.env('apiUrl');

describe('Berry Flavor API - /berry-flavor/', () => {

    context('Con nombre válido', () => {
        it('retorna status 200 y los campos esperados', () => {
            cy.fixture('berry-flavor-valid').then((expected) => {
                cy.request('GET', `${BASE}/berry-flavor/${expected.name}/`)
                  .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.name).to.eq(expected.name);
                    expect(res.body.id).to.eq(expected.id);
                    expect(res.body.contest_type.name).to.eq(expected.contest_type);
                    expect(res.body).to.have.property('berries');
                    expect(res.body.berries).to.be.an('array').and.not.be.empty;
                  });
            });
        });
    });

    context('Berry spicy con mayor potency', () => {
        it('obtiene la berry con mayor potency y la verifica en /berry/', () => {
            cy.fixture('berry-flavor-valid').then((expected) => {
                cy.request('GET', `${BASE}/berry-flavor/${expected.name}/`)
                  .then((res) => {
                    expect(res.status).to.eq(200);

                    const berries = res.body.berries;
                    expect(berries).to.be.an('array').and.not.be.empty;

                    const strongest = berries.reduce((max, b) =>
                        b.potency > max.potency ? b : max
                    );
                    const berryName = strongest.berry.name;

                    cy.log(`🏆 Berry spicy con mayor potency: ${berryName} (potency: ${strongest.potency})`);

                    cy.request('GET', `${BASE}/berry/${berryName}/`)
                      .then((berryRes) => {
                        expect(berryRes.status).to.eq(200);
                        expect(berryRes.body.name).to.eq(berryName);
                        expect(berryRes.body).to.have.property('id');
                        expect(berryRes.body).to.have.property('flavors');

                        const spicyFlavor = berryRes.body.flavors
                            .find(f => f.flavor.name === expected.name);

                        expect(spicyFlavor, 'debe tener sabor spicy').to.exist;
                        expect(spicyFlavor.potency).to.eq(strongest.potency);
                      });
                  });
            });
        });
    });

});