import {Injectable} from '@angular/core';
import {PetCreateForm, PetEndpoint, PetUpdateForm} from '../../core/apina/apina';

@Injectable()
export class PetService {

  constructor(private petEndpoint: PetEndpoint) {
  }

  createCategory(name: string) {
    return this.petEndpoint.createCategory(name);
  }

  getCategories() {
    return this.petEndpoint.getCategories();
  }

  createPet(form: PetCreateForm) {
    return this.petEndpoint.createPet(form);
  }

  createTag(name: string) {
    return this.petEndpoint.createTag(name);
  }

  getPets() {
    return this.petEndpoint.getPets();
  }

  getTags() {
    return this.petEndpoint.getTags();
  }

  updatePet(petId: number, form: PetUpdateForm) {
    return this.petEndpoint.updatePet(form, petId);
  }

  deletePet(petId: number) {
    return this.petEndpoint.deltePet(petId);
  }
}
