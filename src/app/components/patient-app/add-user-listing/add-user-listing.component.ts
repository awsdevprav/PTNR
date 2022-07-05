import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserService } from 'app/services/users/user.service';
import { StorageService } from 'app/services/common/storage.service';
import { BulkActiveInactiveUsersStatus, UsersModel } from 'app/model/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-add-user-listing',
    templateUrl: './add-user-listing.component.html',
    styleUrls: ['./add-user-listing.component.css']
})
export class AddUserListingComponent implements OnInit {

    subUserList: UsersModel[];
    loading: boolean = true;
    p: number = 1;
    childList: boolean = false;
    //check all 
    masterSelected: boolean;
    checklist: any[] = [];
    //checkedList: any;
    bulkActiveInactiveUsersStatus: BulkActiveInactiveUsersStatus;


    //new 
    config: any;
    isSelectedAll = false;
    collection: { value: string; index: number; checked: boolean }[] = [];
    @ViewChildren('pageRow') private pageRows: QueryList<ElementRef<HTMLTableRowElement>>;
    currentPage = 1;
    ascSort: boolean = true;
    sortBy: string = "value";
    constructor(
        private userService: UserService,
        private _storageService: StorageService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {
        this.masterSelected = false;

        this.config = {
            currentPage: 1,
            itemsPerPage: 10
        };
    }

    ngOnInit(): void {
        this.getSubUserList()
    }

    getSubUserList() {
        this.childList = false;
        const userId = this._storageService.getDataFromStorage('userId')
        this.userService.getSubUserList(userId)
            .subscribe((res: any) => {
                this.loading = false;
                if (res?.code === "OK") {
                    debugger;
                    this.subUserList = res.details
                    this.checklist = [];
                    this.checklist = this.subUserList;
                    for (var i = 0; i < this.checklist.length; i++) {
                        ///this.checklist[i].isSelected = false;

                        this.checklist[i].checked = false;
                        this.checklist[i].index = i + 1;
                        if (this.checklist[i].hasOwnProperty('parentUserId') && this.checklist[i].id != userId) {
                            var objIndex = this.checklist.findIndex((element => element.id == this.checklist[i].parentUserId.id));
                            if (this.checklist[objIndex] != null || this.checklist[objIndex] != undefined)
                                this.checklist[objIndex].isParent = true;
                            //
                        }
                        else {
                            this.checklist[i].isParent = false;
                        }
                    }
                    this.cdr.detectChanges();
                    console.log(this.checklist)
                } else {

                }
            }, (error) => {
                if (error?.status === "Bad Request") {
                }
                console.log("error", error);
            })
    }

    // The master checkbox will check/ uncheck all items
    //checkUncheckAll() {
    //    for (var i = 0; i < this.checklist.length; i++) {
    //        this.checklist[i].isSelected = this.masterSelected;
    //    }
    //}

    //// Check All Checkbox Checked
    //isAllSelected() {
    //    this.masterSelected = this.checklist.every(function (item: any) {
    //        return item.isSelected == true;
    //    })
    //    //this.getCheckedItemList();
    //}

    activeInactive(status) {
        this.bulkActiveInactiveUsersStatus = new BulkActiveInactiveUsersStatus();
        this.bulkActiveInactiveUsersStatus.users = [];
        for (var i = 0; i < this.checklist.length; i++) {
            if (this.checklist[i].checked)
                this.bulkActiveInactiveUsersStatus.users.push(this.checklist[i].id)
        }
        this.bulkActiveInactiveUsersStatus.status = (status == 'Active') ? true : false;
        this.userService.activeInactiveUserStatus(this.bulkActiveInactiveUsersStatus)
            .subscribe((res: any) => {
                this.loading = false;
                if (res?.code === "OK") {
                    debugger;
                    this.toastr.success("", res?.message)
                    this.getSubUserList();
                } else {

                }
            }, (error) => {
                if (error?.status === "Bad Request") {
                }
                console.log("error", error);
            })
    }

    showSubUsers(id) {
        this.childList = true;
        this.userService.getSubUserList(id)
            .subscribe((res: any) => {
                debugger;
                this.loading = false;
                if (res?.code === "OK") {
                    this.subUserList = res.details;
                    this.checklist = this.subUserList;
                    //this.checklist = [];
                    //this.checklist.push(this.subUserList);
                    //this.cdr.detectChanges();
                    for (var i = 0; i < this.checklist.length; i++) {
                        this.checklist[i].isSelected = false;
                        if (this.checklist[i].hasOwnProperty('parentUserId') && this.checklist[i].id != id) {
                            var objIndex = this.checklist.findIndex((element => element.id == this.checklist[i].parentUserId.id));
                            if (this.checklist[objIndex] != null || this.checklist[objIndex] != undefined)
                                this.checklist[objIndex].isParent = true;
                        }
                        else {
                            this.checklist[i].isParent = false;
                        }
                    }
                    this.config.currentPage = 1;
                    console.log(this.checklist);
                } else {

                }
            }, (error) => {
                if (error?.status === "Bad Request") {
                }
                console.log("error", error);
            })

    }
    //NEW
    selectAll(isChecked: boolean) {
        this.isSelectedAll = !this.isSelectedAll;
        const indices = (this.pageRows.toArray().map(vcr => +vcr.nativeElement.dataset.index));
        this.checklist.filter(i => indices.indexOf(i.index) > -1)
            .forEach(i => i.checked = this.isSelectedAll);
    }

    pageChange(newPage: number) {
        this.currentPage = newPage;
        this.config.currentPage = newPage
        //this.router.navigate(["/user/userlisting"], { queryParams: { page: newPage } });
    }
}
