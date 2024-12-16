export interface Notification {
  id: number;
  notificationText: string;
  applicantId: number;
  employerId: number;
  vacancyId: number;
  isRead: boolean;
  createdAt: string;
}
