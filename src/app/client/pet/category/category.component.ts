import {Component, OnInit} from '@angular/core';
import {PetService} from '../pet.service';
import {Category} from '../../../core/apina/apina';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isCreatingCategory = false;

  newCategoryName = '';
  categories: Category[];

  constructor(private petService: PetService) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.petService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }, error => {
        // show error message
      });
  }

  onNewCategory() {
    this.isCreatingCategory = true;
  }

  onCreate() {
    this.petService.createCategory(this.newCategoryName)
      .subscribe(
        () => {
          this.loadData();
        },
        error => {
          // show error message
        }
      );
  }

}
