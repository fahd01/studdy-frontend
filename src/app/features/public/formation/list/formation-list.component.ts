import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationService } from "../../../../services/formation.service";
import { Formation } from "../../../../../model/Model";
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// FullCalendar Imports
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Add Modal service import from ng-bootstrap (or any other modal library you're using)
// If you're using ng-bootstrap:
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'formation-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FullCalendarModule
    ],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    // List view properties
    formations: Formation[] = [];
    filteredFormations: Formation[] = [];
    loading = false;
    error = '';
    searchQuery = '';

    // View toggle
    activeView: 'list' | 'calendar' = 'list';

    // For the popup
    selectedFormation: Formation | null = null;

    // FullCalendar properties
    calendarOptions: CalendarOptions = {
        plugins: [
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin
        ],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [], // Will be populated from formations
        eventClick: this.handleEventClick.bind(this),
        height: 'auto',
        editable: false,
        nowIndicator: true,
        dayMaxEvents: true // When there are too many events, show a "+more" link
    };

    // Template reference for the modal
    @ViewChild('formationDetailsModal') formationDetailsModal!: TemplateRef<any>;

    constructor(
        private formationService: FormationService,
        private router: Router,
        private modalService: NgbModal // Add modal service
    ) {}

    ngOnInit(): void {
        this.loadFormations();
    }

    loadFormations(): void {
        this.loading = true;
        this.error = '';

        this.formationService.getAllFormations().subscribe({
            next: (data) => {
                this.formations = data;
                this.filteredFormations = [...data];
                this.updateCalendarEvents();
                console.log('Formations loaded:', this.formations);
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching formations:', err);
                this.error = 'Failed to load formations. Please try again.';
                this.loading = false;
            }
        });
    }

    // Switch between list and calendar views
    setView(view: 'list' | 'calendar'): void {
        this.activeView = view;

        // Force refresh when switching to calendar
        if (view === 'calendar') {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                console.log('Calendar view activated and refreshed');
            }, 100);
        }
    }

    // Search formations based on query
    searchFormations(): void {
        if (!this.searchQuery.trim()) {
            this.filteredFormations = [...this.formations];
        } else {
            const query = this.searchQuery.toLowerCase().trim();
            this.filteredFormations = this.formations.filter(formation =>
                formation.title?.toLowerCase().includes(query) ||
                formation.description?.toLowerCase().includes(query)
            );
        }

        // Update calendar events based on filtered formations
        this.updateCalendarEvents();
    }

    // Convert formations to calendar events
    updateCalendarEvents(): void {
        const events = this.filteredFormations.map(formation => {
            // Ensure proper Date objects
            const startDate = new Date(formation.startDate);
            const endDate = new Date(formation.endDate);

            // Generate a consistent color based on formation ID
            const hue = formation.id ? (formation.id * 137.508) % 360 : Math.random() * 360;

            return {
                id: formation.id?.toString(),
                title: formation.title || 'Unnamed Formation',
                start: startDate,
                end: endDate,
                backgroundColor: `hsl(${hue}, 70%, 50%)`,
                borderColor: `hsl(${hue}, 70%, 45%)`,
                extendedProps: {
                    formation: formation
                }
            };
        });

        // Update the calendar options with new events
        this.calendarOptions = {
            ...this.calendarOptions,
            events: events
        };

        console.log('Calendar events updated:', events);
    }

    // Handle calendar event click - updated to show popup
    handleEventClick(arg: EventClickArg): void {
        const formation = arg.event.extendedProps['formation'] as Formation;

        if (formation) {
            this.selectedFormation = formation;
            this.modalService.open(this.formationDetailsModal, {
                centered: true,
                size: 'lg'
            });
        }
    }

    // Navigate to formation details page from modal
    navigateToFormationDetails(): void {
        if (this.selectedFormation && this.selectedFormation.id) {
            this.modalService.dismissAll();
            this.router.navigate(['/formations', this.selectedFormation.id]);
        }
    }

    // Helper methods for formation display
    getFormationImage(formation: Formation): string {
        if (formation.imagesUrls && formation.imagesUrls.length > 0) {
            return formation.imagesUrls[0];
        }
        return 'assets/landing/images/course-default.jpg';
    }

    formatPrice(price: number): string {
        return '$' + (price || 0).toFixed(2);
    }

    getParticipantCount(formation: Formation): number {
        return formation.participants ? formation.participants.length : 0;
    }

    truncateText(text: string | null | undefined, length: number): string {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    // Format date range
    formatDateRange(start: Date | string, end: Date | string): string {
        const startDate = typeof start === 'string' ? new Date(start) : start;
        const endDate = typeof end === 'string' ? new Date(end) : end;

        const startStr = startDate.toLocaleDateString();
        const endStr = endDate.toLocaleDateString();

        if (startStr === endStr) {
            return startStr;
        }
        return `${startStr} - ${endStr}`;
    }
}