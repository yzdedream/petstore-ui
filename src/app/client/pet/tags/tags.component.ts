import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../core/apina/apina';
import {PetService} from '../pet.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[];
  isCreating = false;
  newTagName = '';

  constructor(private petService: PetService) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.petService.getTags().subscribe(
      tags => this.tags = tags,
      error => {
        // show error message
      }
    );
  }

  onNewTag() {
    this.isCreating = true;
  }


  onSubmit() {
    this.petService.createTag(this.newTagName).subscribe(
      () => {
        this.loadData();
        this.newTagName = '';
        this.isCreating = false;
      }, error => {
        // show error message
      });
  }

}
