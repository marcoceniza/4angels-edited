<template>
    <ion-page>
        <ion-router-outlet></ion-router-outlet>
        <ion-menu content-id="main-content">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Menu</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list>
                    <ion-item button lines="full" @click="$router.push('/employee/schedules')">
                        <ion-label>Schedules</ion-label>
                        <ion-icon :icon="calendarClear" slot="start" color="primary"></ion-icon>
                    </ion-item>
                    <ion-item button lines="full" @click="$router.push('/employee/timesheets')">
                        <ion-label>Timesheets</ion-label>
                        <ion-icon :icon="navigate" slot="start" color="primary"></ion-icon>
                    </ion-item>
                    <ion-item button lines="full" @click="$router.push('/employee/profile')">
                        <ion-label>Profile</ion-label>
                        <ion-icon :icon="person" slot="start" color="primary"></ion-icon>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-menu>
        <ion-header class="ion-head">
            <ion-toolbar class="ion-padding-top">
                <ion-menu-button slot="start"></ion-menu-button>
                <ion-buttons slot="end">
                    <ion-avatar @click="$router.push('/employee/profile')">
                        <img :src="user.employee_profilepicture"/>
                    </ion-avatar>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
                <ion-text class="ion-padding-start ion-margin-top" color="primary">Hello {{ user.employee_firstname }} {{ user.employee_lastname }}</ion-text>
                <p class="ion-padding-start">{{ getMonthToday }} {{ new Date().getDate() }}, {{ new Date().getFullYear() }}</p>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen="true" id="main-content" scroll-events="true" @ionScroll="logScrolling($event)">
            <ion-refresher style="position:relative; z-index:999;" slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content refreshing-spinner="crescent"></ion-refresher-content>
            </ion-refresher>

            <div class="stopwatch ion-margin-top">
                <p>HOURS <span>{{ hours }}</span></p>
                <p>MINUTES <span>{{ minutes }}</span></p>
                <p>SECONDS <span>{{ seconds }}</span></p>
            </div>
            <div v-if="Object.keys(current).length == 0"><!--check if naay existing schedule nga naka clocking which is status kay 2-->
                <ion-text color="primary">
                    <h3>Choose your shift below:</h3>
                </ion-text>
                <div v-if="upcoming.length != 0">
                    <div class="mt" v-for="upSchedule in upcoming" :key="upSchedule.assigndesignation_employeeid">
                        <ion-card button="true" @click="ReadyToClockin(upSchedule.schedules_id,new Date().toLocaleTimeString())">
                            <ion-card-header>
                                <div class="d-flex">
                                    <div>
                                        <ion-card-title>{{ dateFormat('%h:%i%a', upSchedule.schedules_dates+' '+upSchedule.schedules_timestart) }} - {{ dateFormat('%h:%i%a', upSchedule.schedules_dates+' '+upSchedule.schedules_timeend) }}</ion-card-title>
                                        <ion-card-subtitle>{{ upSchedule.role_name }}</ion-card-subtitle>
                                    </div>
                                    <div>
                                        <ion-icon :icon="timerOutline"></ion-icon>
                                    </div>
                                </div>
                            </ion-card-header>
                            <ion-card-content>
                                <p>Facility: {{ upSchedule.facility_name }}</p>
                                <p>Schedule Description: {{ upSchedule.schedules_description }}</p>
                            </ion-card-content>
                        </ion-card>
                    </div>
                </div>
                <div style="text-align:center;" v-else>
                    <div class="mt">
                        <ion-text color="secondary">
                            <h3>
                                No schedule assigned to you today
                            </h3>
                        </ion-text>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="mt">
                    <ion-card-header>
                        <ion-text>You clockin at {{ timein }}</ion-text>
                        <ion-card-title>{{ dateFormat('%h:%i%a', current.schedules_dates+' '+current.schedules_timestart) }} - {{ dateFormat('%h:%i%a', current.schedules_dates+' '+current.schedules_timeend) }}</ion-card-title>
                        <ion-card-subtitle>{{ current.role_name }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <p>Facility: {{ current.facility_name }}</p>
                        <p>Schedule Description: {{ current.schedules_description }}</p>
                    </ion-card-content>
                </div>
                <ion-button @click="ClockOut">Clock Out</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue';
import { IonContent, IonPage, IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle,IonCardContent, menuController, IonButtons,IonButton, IonMenu, IonMenuButton, IonRefresher, IonRefresherContent, IonIcon, IonRouterOutlet, IonTitle, IonLabel, IonItem, IonList, IonAvatar, IonText } from '@ionic/vue';
import { apps, map, chatbox, settings, ticket, helpCircle, logOut, alertCircle, warning, menu, reader, checkmarkCircle, location, time, calendar, calendarClear, navigate, person, timerOutline } from 'ionicons/icons';
import { lStore, axios, formatDateString,dateFormat,openToast,calcFlyDist } from '@/functions'; 
import { Geolocation } from '@capacitor/geolocation';


export default defineComponent({
    name: 'DashboardView',
    components: { IonContent, IonPage, IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle,IonCardContent, IonButtons,IonButton, IonMenu, IonMenuButton, IonRefresher, IonRefresherContent, IonIcon, IonRouterOutlet, IonTitle, IonLabel, IonItem, IonList, IonAvatar, IonText },
    setup() {
        const logScrolling = (e) => {
            if (e.detail.scrollTop >= 20) {
                document.querySelector('.ion-head').classList.add('ion-head-style');
            } else {
                document.querySelector('.ion-head').classList.remove('ion-head-style');
            }
        }
        return { apps, map, chatbox, settings, ticket, helpCircle, logOut, alertCircle, menu, warning, logScrolling, reader,timerOutline, checkmarkCircle, location, time, calendar, calendarClear, navigate, person, IonRefresher, IonRefresherContent };
    },
    data() {
        return{
            message: null,
            clockIn: '',
            clockOut: '',
            disabled: true,
            disabled2: false,
            facility: '',
            user: {},
            clockTimer: 1,
            startTimer: false,
            timeData: '',
            hours: '',
            minutes: '',
            seconds: '',
            todaySchedule: true,
            upcomingSchedule: false,
            upcoming: [{}],
            nextSched:{},
            geotest:{long:0,lat:0},
            timesheets:[],
            segmentMode: 'todays-schedule',
            getMonthToday: '',
            fiveminutes: 0,
            current:{},
            timein:lStore.get('time'),
        }
    },
    created() {
        this.clear();
        this.user = lStore.get('user_info');
    },
    mounted() {
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        let day = days[new Date().getDay()].toUpperCase();
        this.getDayToday = day;

        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        
        let month = months[new Date().getMonth()].toUpperCase();
        this.getMonthToday = month;

        let getDataTime = () => {
            let today = new Date();
            this.hours = ("00" + today.getHours()).slice(-2);
            if(this.hours > 12 || this.hours < 1) this.hours = today.getHours() % 12 || 12;
            this.minutes = ("00" + today.getMinutes()).slice(-2);
            this.seconds = ("00" + today.getSeconds()).slice(-2);
        }
        setInterval(() => {
            getDataTime();
        }, 1000);

        this.fetchScheds();
    },
    watch:{
        $route(to){
            if(to.path == '/employee/dashboard'){
                this.fetchScheds();
            }
        }
    },
    methods: {
        dateFormat,
        handleRefresh(event){
            this.fetchScheds();
            setTimeout(() => {
                event.target.complete();
            }, 2000);
        },
        clear(){
            this.message = null;
            this.clockIn = '';
            this.clockOut = '';
            this.disabled = true;
            this.disabled2 = false;
            this.facility= '';
            this.user= {};
            this.clockTimer= 1;
            this.startTimer= false;
            this.timeData= '';
            this.hours= '';
            this.minutes= '';
            this.seconds= '';
            this.todays= false;
            this.upcomings= true;
            this.upcoming= [];
        },
        openMenu() {
            menuController.open('app-menu');
        },
        ReadyToClockin(data,data2)
        {
            lStore.set('scheduleclockinid',data);
            lStore.set('time',data2);
            this.$router.push('/timeclock');
        },
        async mapFind(long,lat){
            let accessToken = "pk.eyJ1Ijoic3BlZWR5cmVwYWlyIiwiYSI6ImNsNWg4cGlzaDA3NTYzZHFxdm1iMTJ2cWQifQ.j_XBhRHLg-CcGzah7uepMA";
            let returnVal = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${accessToken}`)
            return returnVal.data.features[0].place_name;
        },
        closeMenu() {
            menuController.close('app-menu');
        },
        async fetchScheds(){
            let currentDate = new Date();
            let currentDateString = currentDate.toLocaleDateString().split('/');
            currentDateString = formatDateString(currentDateString[2] + '-' + currentDateString[0] + '-' + currentDateString[1]).replaceAll(' ','');

            let weekDate = new Date();
            weekDate.setDate(weekDate.getDate()+7);
            weekDate = weekDate.toLocaleDateString();
            let weekDateArr = weekDate.split('/');
            let weekDateString = formatDateString(weekDateArr[2]+'-'+weekDateArr[0]+'-'+weekDateArr[1]).replaceAll(' ','');
            let resp = await axios.post(`schedule?_joins=assignschedules,assigndesignation,facility,role&_on=assignschedules_scheduleid=schedules_id,assigndesignation_id=assignschedules_assigndesignationid,schedules_facilityid=facility_id,role_id=assigndesignation_roleid&_GTE_schedules_dates=${currentDateString}&_LSE_schedules_dates=${weekDateString}&_batch=true&assigndesignation:assigndesignation_employeeid=${lStore.get('user_id')}&_orderby=dates,schedules__timestart_ASC`);
            console.log(resp.data.result);
            if(resp.data == null || !resp.data.success) return;
            if(resp.data != null && resp.data.success) {
                //Getting Upcoming schedules
                resp.data.result.forEach(element => {
                    if(element.assignschedules_status == 2 && element.assignschedules_timeout == null)
                    {
                        this.current = element;
                    }
                });
                if(Object.keys(this.current).length == 0)
                {                    
                    this.upcoming = resp.data.result.filter(el =>{
                        return new Date(el.schedules_dates).toLocaleDateString() == new Date().toLocaleDateString() && el.assignschedules_timein == null;//add condition if the start time and end time kay humana kay dapat di makita sa schedule
                    })
                    console.log(this.upcoming);
                    this.upcoming = this.upcoming.sort((a,b)=>{
                        return new Date(a.schedules_dates+' '+ a.schedules_timestart) - new Date(b.schedules_dates+' '+ b.schedules_timestart)
                    });
                }
                console.log(this.upcoming)
            }

        },
        async ClockOut(){
            const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
            if(calcFlyDist([this.current.facility_location_long,this.current.facility_location_lat],[coordinates.coords.longitude,coordinates.coords.latitude]) <= 0.2)//longitude lattitude
            {
                let ClockinTime = new Date().toLocaleTimeString()
                axios.post('assign/update?id='+this.current.assignschedules_id,null,{ assignschedules_timeout: ClockinTime, assignschedules_status: 1,assignschedules_timeoutlocationname: await this.mapFind(coordinates.coords.longitude,coordinates.coords.latitude), assignschedules_timeoutlong: coordinates.coords.longitude, assignschedules_timeoutlat: coordinates.coords.latitude}).then(()=>{
                    openToast('Successfully Clockout', 'primary')
                })
                setTimeout(()=>{
                    window.location.reload();
                },3000);
            }
            else
            {
                openToast('You need to be near on the facility to clockout', 'danger');
                return;
            }
        },
    }
});
</script>

<style scoped>
.mt{
    margin-top: 15px;
}
.d-flex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
}
.d-flex ion-icon{
    font-size: 25px;
}
.item.sc-ion-label-ios-h, .item .sc-ion-label-ios-h{white-space: unset;}

.noData{text-align: center; color: #959595; font-weight: bold;}

.disabled2,.disabled{pointer-events: none;}
.today {display: none;}
.upcoming {display: none;}

ion-menu ion-content {
    background: #fff;
    --background: #fff;
    --padding-top: 20px;
    --padding-bottom: 60px;
    --padding-start: 0;
    --padding-end: 0;
    --inner-padding-start: 0;
    --inner-padding-end: 0;
}

ion-label h1{color: #555;margin-bottom: 9px; border-left: 12px groove #1f94db; padding-left: 6px; text-transform: capitalize;font-size: 18px !important;}

ion-item{margin-top: 15px;}

ion-item p strong{color: #999;}

.ion-head-style {
    background: linear-gradient(to top, #fff, #6cbcf0);
    padding-bottom: 10px;
}

ion-menu ion-list {
    padding: 0;
}

ion-menu ion-content ion-item ion-label {
    margin: 0;
}

ion-menu ion-content ion-item ion-button {
    width: 100%;
    margin: auto;
}

ion-avatar img {
    padding: 3px;
    border: 3px solid #1f94db;
}

ion-header {
    z-index: 999;
}

ion-header {
    box-shadow: none;
}

ion-header::after {
    display: none;
}

ion-card {
    margin: 24px auto;
}

ion-card img {
    display: table;
    width: 100%;
    max-width: 200px;
    height: 100%;
    object-fit: contain;
    margin: auto;
    padding: 3px;
}

ion-card-title {
    font-size: 15px;
    margin: 6px auto 4px;
    color: #1f94db;
}

/* ion-card-subtitle {
    color: #999;
    font-weight: bold;
} */

ion-text {
    font-size: 30px;
    display: block;
}

ion-text p {
    font-size: 50px;
}

.main-header {
    position: relative;
    z-index: 2;
}

.sub-header {
    position: relative;
    top: 0;
    --padding-top: 0;
    transition: top ease-in-out 500ms;
    z-index: 1;
    border-radius: 0 0 30px 30px;
}

.sub-header ion-card {
    margin: 0 auto 8px; 
    padding: 15px 0;
    border-radius: 25px;
}

.sub-header.hidden {
    top: -200px;
}

ion-header {
    box-shadow: none;
}

ion-header::after {
    display: none;
}

ion-text h3 {
    font-size: 18px;
    margin: 0;
}

ion-card {
    margin: 0 auto;
}

ion-card img {
    display: table;
    width: 100%;
    max-width: 200px;
    height: 100%;
    object-fit: contain;
    margin: auto;
}
.time-wrap {
    border-radius: 30px;
}

.time-wrap ion-item ion-label:first-child {
    background: #1f94db !important;
    border-radius: 30px 30px 30px 30px;
    color: #fff;
}

.time-wrap ion-item ion-label {
    cursor: pointer;
    height: 100%;
    margin: 0;
}
.time-wrap ion-item ion-label p {
    margin: 4px 0;
    text-align: center;
    font-size: 17px;
}

.time-wrap ion-item ion-label:first-child p {
    margin: 8px 0;
    color: #fff;
    font-size: 17px;
}

.time-wrap ion-item ion-label p span {
    display: block;
    color: #000;
    font-size: 16px;
}

.time-wrap ion-item {
    --padding-start: 0;
    --padding-end: 0;
}

.time-wrap ion-item .item-inner {
    --padding-end: 0;
}

ion-item p {
	color: #1f94db;
    font-weight: bold;
}

ion-item p span {
    display: block;
    color: #999999;
    margin-top: 2px;
    font-weight: normal;
}

ion-list {
    border-radius: 12px;
}

.approved {
    font-size: 13px;
    font-weight: bold;
    color: #999;
}

.approved ion-icon {
    position: relative;
    top: 2px;
    left: 1px;
}

.categories {
    font-weight: bold;
    color: #1f94db;
    font-size: 20px;
}

ion-toolbar {
    background: none;
    color: #000;
}

ion-toolbar p {
    margin: 4px 0 0;
    font-size: 12px;
    color: #888;
}

ion-title {
    color: #fff;
}

.stopwatch {
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
}

.stopwatch span {
    position: relative;
    padding: 8px 15px;
    font-size: 35px;
    background: #555;
    margin: 4px 10px;
    color: #fff;
    border-radius: 6px;
    display: block;
}

.stopwatch span::after {
    background: #555;
    width: 6px;
    height: 6px;
    position: absolute;
    content: '';
    border-radius: 50%;
    bottom: 20px;
    right: -13px;
}

.stopwatch p:last-child span::after {
    display: none;
}

.stopwatch span::before {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;
    bottom: 50%;
    content: "";
    background: #232323;
    opacity: .4;
    height: 2px;
}

.stopwatch p {
    font-size: 11px;
    color: #605f5f;
    font-weight: bold;
}

ion-title {
    color: #fff;
}

ion-menu ion-item {
    padding-bottom: 12px;
}

.segment-class {
    margin-top: 25px;
    margin-bottom: 20px;
}


ion-label small{display: inline-block;margin-left:10px;padding-left: 10px;position: relative;}
ion-label small::before{position: absolute;content: "";background: #1f94db;display: block;left: 0px;width: 1px;height: 12px;top: 1px;}


</style>