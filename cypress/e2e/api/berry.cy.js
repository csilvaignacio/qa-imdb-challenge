/// <reference types="cypress" />

const BASE = Cypress.env('apiUrl');

describe('Berry API - /berry/{id o nombre}', () => {

    context('Con ID válido', () => {
        it('retorna status 200 y los campos esperados', () => {
            cy.fixture('berry-valid').then((expected) => {
                cy.request('GET', `${BASE}/berry/${expected.id}/`)
                  .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.id).to.eq(expected.id);
                    expect(res.body.name).to.eq(expected.name);
                    expect(res.body).to.have.property('growth_time');
                    expect(res.body).to.have.property('flavors');
                    expect(res.body.flavors).to.be.an('array');
                  });
            });
        });
    });

    context('Con nombre válido', () => {
        it('retorna status 200 y los campos esperados', () => {
            cy.fixture('berry-valid').then((expected) => {
                cy.request('GET', `${BASE}/berry/${expected.name}/`)
                  .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.name).to.eq(expected.name);
                    expect(res.body.id).to.eq(expected.id);
                    expect(res.body).to.have.property('flavors');
                    expect(res.body.flavors).to.be.an('array');
                  });
            });
        });
    });

    context('Con ID inválido', () => {
        it('retorna status 404', () => {
            cy.request({
                method: 'GET',
                url: `${BASE}/berry/99999/`,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(404);
            });
        });
    });

    context('Con nombre inválido', () => {
        it('retorna status 404', () => {
            cy.request({
                method: 'GET',
                url: `${BASE}/berry/nombreinvalido/`,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(404);
            });
        });
    });

});