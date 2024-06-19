import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { ArrowsInLineHorizontal, Fire, Medal, Percent } from "@phosphor-icons/react";
import { Activity } from "../../@types/interfaces";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Link } from "react-router-dom";

export function Statistics() {
    interface MorePerformedActivity {
        activity: Activity;
        count: number;
    }

    interface BestStreakActivity {
        activity: Activity;
        streak: number;
    }

    interface EdgeDifficultyActivities {
        highest: {
            activity: Activity;
            average_effort: Number;
        };
        lowest: {
            activity: Activity;
            average_effort: Number;
        };
    }

    interface CurrentHabits {
        activity_group: string;
        created_at: string;
        id: number;
        name: string;
        profile: number;
        recurrence: string;
        until: string;
        updated_at: string;
    }

    interface HabitFormationProgress {
        activity: Activity;
        streak: number;
        previous_date: string;
        last_report: string;
        days_until_habit: string;
    }

    const [morePerformedActivity, setMorePerformedActivity] =
        useState<MorePerformedActivity | null>();

    const [bestStreakActivity, setBestStreakActivity] =
        useState<BestStreakActivity | null>();

    const [edgeDifficultyActivities, setEdgeDifficultyActivities] =
        useState<EdgeDifficultyActivities | null>();

    const [currentHabits, setCurrentHabits] = useState<CurrentHabits[] | []>(
        []
    );

    const [habitFormationProgress, setHabitFormationProgress] = useState<
        HabitFormationProgress[] | []
    >([]);

    useEffect(() => {
        getMorePerformedActivity();
        getBestStreakActivity();
        getEdgeDifficultyActivities();
        getCurrentHabits();
        getHabitFormationProgress();
    }, []);

    async function getMorePerformedActivity() {
        try {
            const { data } = await api.get("/reports/most_performed_activity/");

            setMorePerformedActivity(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    const calendarData = [{ 'value': 241, 'day': '2024-01-01' }, { 'value': 405, 'day': '2024-01-03' }, { 'value': 312, 'day': '2024-01-04' }, { 'value': 111, 'day': '2024-01-06' }, { 'value': 68, 'day': '2024-01-07' }, { 'value': 479, 'day': '2024-01-08' }, { 'value': 245, 'day': '2024-01-09' }, { 'value': 114, 'day': '2024-01-10' }, { 'value': 51, 'day': '2024-01-11' }, { 'value': 497, 'day': '2024-01-12' }, { 'value': 156, 'day': '2024-01-13' }, { 'value': 238, 'day': '2024-01-14' }, { 'value': 205, 'day': '2024-01-15' }, { 'value': 251, 'day': '2024-01-16' }, { 'value': 86, 'day': '2024-01-17' }, { 'value': 103, 'day': '2024-01-18' }, { 'value': 203, 'day': '2024-01-19' }, { 'value': 352, 'day': '2024-01-20' }, { 'value': 150, 'day': '2024-01-21' }, { 'value': 406, 'day': '2024-01-22' }, { 'value': 101, 'day': '2024-01-23' }, { 'value': 468, 'day': '2024-01-24' }, { 'value': 359, 'day': '2024-01-25' }, { 'value': 59, 'day': '2024-01-26' }, { 'value': 144, 'day': '2024-01-27' }, { 'value': 267, 'day': '2024-01-28' }, { 'value': 276, 'day': '2024-01-29' }, { 'value': 267, 'day': '2024-01-30' }, { 'value': 424, 'day': '2024-01-31' }, { 'value': 25, 'day': '2024-02-01' }, { 'value': 351, 'day': '2024-02-02' }, { 'value': 17, 'day': '2024-02-03' }, { 'value': 169, 'day': '2024-02-04' }, { 'value': 399, 'day': '2024-02-05' }, { 'value': 297, 'day': '2024-02-06' }, { 'value': 50, 'day': '2024-02-07' }, { 'value': 343, 'day': '2024-02-08' }, { 'value': 125, 'day': '2024-02-09' }, { 'value': 128, 'day': '2024-02-10' }, { 'value': 16, 'day': '2024-02-11' }, { 'value': 15, 'day': '2024-02-12' }, { 'value': 158, 'day': '2024-02-13' }, { 'value': 230, 'day': '2024-02-14' }, { 'value': 40, 'day': '2024-02-15' }, { 'value': 388, 'day': '2024-02-16' }, { 'value': 17, 'day': '2024-02-17' }, { 'value': 330, 'day': '2024-02-18' }, { 'value': 352, 'day': '2024-02-19' }, { 'value': 463, 'day': '2024-02-20' }, { 'value': 318, 'day': '2024-02-21' }, { 'value': 393, 'day': '2024-02-22' }, { 'value': 235, 'day': '2024-02-23' }, { 'value': 166, 'day': '2024-02-24' }, { 'value': 94, 'day': '2024-02-25' }, { 'value': 423, 'day': '2024-02-26' }, { 'value': 115, 'day': '2024-02-27' }, { 'value': 103, 'day': '2024-02-28' }, { 'value': 82, 'day': '2024-02-29' }, { 'value': 219, 'day': '2024-03-01' }, { 'value': 494, 'day': '2024-03-02' }, { 'value': 476, 'day': '2024-03-03' }, { 'value': 396, 'day': '2024-03-04' }, { 'value': 422, 'day': '2024-03-05' }, { 'value': 61, 'day': '2024-03-06' }, { 'value': 484, 'day': '2024-03-07' }, { 'value': 65, 'day': '2024-03-08' }, { 'value': 60, 'day': '2024-03-09' }, { 'value': 412, 'day': '2024-03-10' }, { 'value': 365, 'day': '2024-03-11' }, { 'value': 15, 'day': '2024-03-12' }, { 'value': 259, 'day': '2024-03-13' }, { 'value': 338, 'day': '2024-03-14' }, { 'value': 414, 'day': '2024-03-15' }, { 'value': 126, 'day': '2024-03-16' }, { 'value': 123, 'day': '2024-03-17' }, { 'value': 271, 'day': '2024-03-18' }, { 'value': 246, 'day': '2024-03-19' }, { 'value': 266, 'day': '2024-03-20' }, { 'value': 153, 'day': '2024-03-21' }, { 'value': 118, 'day': '2024-03-22' }, { 'value': 322, 'day': '2024-03-23' }, { 'value': 39, 'day': '2024-03-24' }, { 'value': 318, 'day': '2024-03-25' }, { 'value': 419, 'day': '2024-03-26' }, { 'value': 476, 'day': '2024-03-27' }, { 'value': 293, 'day': '2024-03-28' }, { 'value': 165, 'day': '2024-03-29' }, { 'value': 283, 'day': '2024-03-30' }, { 'value': 87, 'day': '2024-03-31' }, { 'value': 161, 'day': '2024-04-01' }, { 'value': 412, 'day': '2024-04-02' }, { 'value': 309, 'day': '2024-04-03' }, { 'value': 29, 'day': '2024-04-04' }, { 'value': 296, 'day': '2024-04-05' }, { 'value': 61, 'day': '2024-04-06' }, { 'value': 435, 'day': '2024-04-07' }, { 'value': 211, 'day': '2024-04-08' }, { 'value': 451, 'day': '2024-04-09' }, { 'value': 332, 'day': '2024-04-10' }, { 'value': 332, 'day': '2024-04-11' }, { 'value': 381, 'day': '2024-04-12' }, { 'value': 255, 'day': '2024-04-13' }, { 'value': 369, 'day': '2024-04-14' }, { 'value': 487, 'day': '2024-04-15' }, { 'value': 161, 'day': '2024-04-16' }, { 'value': 229, 'day': '2024-04-17' }, { 'value': 93, 'day': '2024-04-18' }, { 'value': 142, 'day': '2024-04-19' }, { 'value': 7, 'day': '2024-04-20' }, { 'value': 299, 'day': '2024-04-21' }, { 'value': 395, 'day': '2024-04-22' }, { 'value': 196, 'day': '2024-04-23' }, { 'value': 433, 'day': '2024-04-24' }, { 'value': 132, 'day': '2024-04-25' }, { 'value': 483, 'day': '2024-04-26' }, { 'value': 68, 'day': '2024-04-27' }, { 'value': 487, 'day': '2024-04-28' }, { 'value': 22, 'day': '2024-04-29' }, { 'value': 487, 'day': '2024-04-30' }, { 'value': 412, 'day': '2024-05-01' }, { 'value': 1, 'day': '2024-05-02' }, { 'value': 373, 'day': '2024-05-03' }, { 'value': 115, 'day': '2024-05-04' }, { 'value': 75, 'day': '2024-05-05' }, { 'value': 276, 'day': '2024-05-06' }, { 'value': 80, 'day': '2024-05-07' }, { 'value': 297, 'day': '2024-05-08' }, { 'value': 339, 'day': '2024-05-09' }, { 'value': 439, 'day': '2024-05-10' }, { 'value': 483, 'day': '2024-05-11' }, { 'value': 173, 'day': '2024-05-12' }, { 'value': 233, 'day': '2024-05-13' }, { 'value': 355, 'day': '2024-05-14' }, { 'value': 276, 'day': '2024-05-15' }, { 'value': 77, 'day': '2024-05-16' }, { 'value': 138, 'day': '2024-05-17' }, { 'value': 53, 'day': '2024-05-18' }, { 'value': 76, 'day': '2024-05-19' }, { 'value': 210, 'day': '2024-05-20' }, { 'value': 249, 'day': '2024-05-21' }, { 'value': 142, 'day': '2024-05-22' }, { 'value': 142, 'day': '2024-05-23' }, { 'value': 496, 'day': '2024-05-24' }, { 'value': 331, 'day': '2024-05-25' }, { 'value': 484, 'day': '2024-05-26' }, { 'value': 465, 'day': '2024-05-27' }, { 'value': 196, 'day': '2024-05-28' }, { 'value': 60, 'day': '2024-05-29' }, { 'value': 177, 'day': '2024-05-30' }, { 'value': 477, 'day': '2024-05-31' }, { 'value': 473, 'day': '2024-06-01' }, { 'value': 458, 'day': '2024-06-02' }, { 'value': 450, 'day': '2024-06-03' }, { 'value': 73, 'day': '2024-06-04' }, { 'value': 126, 'day': '2024-06-05' }, { 'value': 240, 'day': '2024-06-06' }, { 'value': 165, 'day': '2024-06-07' }, { 'value': 302, 'day': '2024-06-08' }, { 'value': 43, 'day': '2024-06-09' }, { 'value': 397, 'day': '2024-06-10' }, { 'value': 31, 'day': '2024-06-11' }, { 'value': 50, 'day': '2024-06-12' }, { 'value': 217, 'day': '2024-06-13' }, { 'value': 236, 'day': '2024-06-14' }, { 'value': 311, 'day': '2024-06-15' }, { 'value': 447, 'day': '2024-06-16' }, { 'value': 300, 'day': '2024-06-17' }, { 'value': 335, 'day': '2024-06-18' }, { 'value': 244, 'day': '2024-06-19' }, { 'value': 397, 'day': '2024-06-20' }, { 'value': 133, 'day': '2024-06-21' }, { 'value': 199, 'day': '2024-06-22' }, { 'value': 311, 'day': '2024-06-23' }, { 'value': 487, 'day': '2024-06-24' }, { 'value': 375, 'day': '2024-06-25' }, { 'value': 216, 'day': '2024-06-26' }, { 'value': 496, 'day': '2024-06-27' }, { 'value': 241, 'day': '2024-06-28' }, { 'value': 397, 'day': '2024-06-29' }, { 'value': 14, 'day': '2024-06-30' }, { 'value': 396, 'day': '2024-07-01' }, { 'value': 498, 'day': '2024-07-02' }, { 'value': 275, 'day': '2024-07-03' }, { 'value': 411, 'day': '2024-07-04' }, { 'value': 255, 'day': '2024-07-05' }, { 'value': 237, 'day': '2024-07-06' }, { 'value': 306, 'day': '2024-07-07' }, { 'value': 334, 'day': '2024-07-08' }, { 'value': 316, 'day': '2024-07-09' }, { 'value': 116, 'day': '2024-07-10' }, { 'value': 35, 'day': '2024-07-11' }, { 'value': 227, 'day': '2024-07-12' }, { 'value': 89, 'day': '2024-07-13' }, { 'value': 367, 'day': '2024-07-14' }, { 'value': 392, 'day': '2024-07-15' }, { 'value': 289, 'day': '2024-07-16' }, { 'value': 470, 'day': '2024-07-17' }, { 'value': 429, 'day': '2024-07-18' }, { 'value': 472, 'day': '2024-07-19' }, { 'value': 211, 'day': '2024-07-20' }, { 'value': 82, 'day': '2024-07-21' }, { 'value': 23, 'day': '2024-07-22' }, { 'value': 53, 'day': '2024-07-23' }, { 'value': 87, 'day': '2024-07-24' }, { 'value': 400, 'day': '2024-07-25' }, { 'value': 310, 'day': '2024-07-26' }, { 'value': 294, 'day': '2024-07-27' }, { 'value': 285, 'day': '2024-07-28' }, { 'value': 167, 'day': '2024-07-29' }, { 'value': 485, 'day': '2024-07-30' }, { 'value': 445, 'day': '2024-07-31' }, { 'value': 201, 'day': '2024-08-01' }, { 'value': 192, 'day': '2024-08-02' }, { 'value': 409, 'day': '2024-08-03' }, { 'value': 454, 'day': '2024-08-04' }, { 'value': 189, 'day': '2024-08-05' }, { 'value': 223, 'day': '2024-08-06' }, { 'value': 304, 'day': '2024-08-07' }, { 'value': 167, 'day': '2024-08-08' }, { 'value': 408, 'day': '2024-08-09' }, { 'value': 140, 'day': '2024-08-10' }, { 'value': 140, 'day': '2024-08-11' }, { 'value': 487, 'day': '2024-08-12' }, { 'value': 61, 'day': '2024-08-13' }, { 'value': 20, 'day': '2024-08-14' }, { 'value': 144, 'day': '2024-08-15' }, { 'value': 261, 'day': '2024-08-16' }, { 'value': 475, 'day': '2024-08-17' }, { 'value': 127, 'day': '2024-08-18' }, { 'value': 212, 'day': '2024-08-19' }, { 'value': 158, 'day': '2024-08-20' }, { 'value': 279, 'day': '2024-08-21' }, { 'value': 50, 'day': '2024-08-22' }, { 'value': 163, 'day': '2024-08-23' }, { 'value': 327, 'day': '2024-08-24' }, { 'value': 36, 'day': '2024-08-25' }, { 'value': 206, 'day': '2024-08-26' }, { 'value': 98, 'day': '2024-08-27' }, { 'value': 338, 'day': '2024-08-28' }, { 'value': 37, 'day': '2024-08-29' }, { 'value': 444, 'day': '2024-08-30' }, { 'value': 323, 'day': '2024-08-31' }, { 'value': 170, 'day': '2024-09-01' }, { 'value': 292, 'day': '2024-09-02' }, { 'value': 7, 'day': '2024-09-03' }, { 'value': 239, 'day': '2024-09-04' }, { 'value': 357, 'day': '2024-09-05' }, { 'value': 264, 'day': '2024-09-06' }, { 'value': 244, 'day': '2024-09-07' }, { 'value': 99, 'day': '2024-09-08' }, { 'value': 277, 'day': '2024-09-09' }, { 'value': 206, 'day': '2024-09-10' }, { 'value': 126, 'day': '2024-09-11' }, { 'value': 371, 'day': '2024-09-12' }, { 'value': 281, 'day': '2024-09-13' }, { 'value': 266, 'day': '2024-09-19' }, { 'value': 499, 'day': '2024-09-20' }, { 'value': 147, 'day': '2024-09-21' }, { 'value': 315, 'day': '2024-09-22' }, { 'value': 385, 'day': '2024-09-23' }, { 'value': 180, 'day': '2024-09-24' }, { 'value': 76, 'day': '2024-09-25' }, { 'value': 258, 'day': '2024-09-26' }, { 'value': 354, 'day': '2024-09-27' }, { 'value': 113, 'day': '2024-09-28' }, { 'value': 370, 'day': '2024-09-30' }, { 'value': 137, 'day': '2024-10-01' }, { 'value': 371, 'day': '2024-10-02' }, { 'value': 372, 'day': '2024-10-03' }, { 'value': 61, 'day': '2024-10-04' }, { 'value': 41, 'day': '2024-10-05' }, { 'value': 101, 'day': '2024-10-06' }, { 'value': 351, 'day': '2024-10-07' }, { 'value': 344, 'day': '2024-10-08' }, { 'value': 335, 'day': '2024-10-09' }, { 'value': 247, 'day': '2024-10-10' }, { 'value': 149, 'day': '2024-10-11' }, { 'value': 61, 'day': '2024-10-12' }, { 'value': 50, 'day': '2024-10-13' }, { 'value': 459, 'day': '2024-10-14' }, { 'value': 383, 'day': '2024-10-15' }, { 'value': 58, 'day': '2024-10-16' }, { 'value': 217, 'day': '2024-10-17' }, { 'value': 291, 'day': '2024-10-18' }, { 'value': 463, 'day': '2024-10-19' }, { 'value': 143, 'day': '2024-10-20' }, { 'value': 30, 'day': '2024-10-21' }, { 'value': 322, 'day': '2024-10-22' }, { 'value': 396, 'day': '2024-10-23' }, { 'value': 191, 'day': '2024-10-24' }, { 'value': 290, 'day': '2024-10-25' }, { 'value': 135, 'day': '2024-10-26' }, { 'value': 61, 'day': '2024-10-27' }, { 'value': 208, 'day': '2024-10-28' }, { 'value': 165, 'day': '2024-10-29' }, { 'value': 122, 'day': '2024-10-30' }, { 'value': 490, 'day': '2024-10-31' }, { 'value': 118, 'day': '2024-11-01' }, { 'value': 63, 'day': '2024-11-02' }, { 'value': 264, 'day': '2024-11-03' }, { 'value': 3, 'day': '2024-11-04' }, { 'value': 191, 'day': '2024-11-05' }, { 'value': 439, 'day': '2024-11-06' }, { 'value': 101, 'day': '2024-11-07' }, { 'value': 269, 'day': '2024-11-08' }, { 'value': 75, 'day': '2024-11-09' }, { 'value': 200, 'day': '2024-11-10' }, { 'value': 306, 'day': '2024-11-11' }, { 'value': 13, 'day': '2024-11-12' }, { 'value': 200, 'day': '2024-11-13' }, { 'value': 209, 'day': '2024-11-14' }, { 'value': 259, 'day': '2024-11-15' }, { 'value': 95, 'day': '2024-11-16' }, { 'value': 33, 'day': '2024-11-17' }, { 'value': 431, 'day': '2024-11-18' }, { 'value': 255, 'day': '2024-11-19' }, { 'value': 42, 'day': '2024-11-20' }, { 'value': 187, 'day': '2024-11-21' }, { 'value': 77, 'day': '2024-11-22' }, { 'value': 68, 'day': '2024-11-23' }, { 'value': 272, 'day': '2024-11-24' }, { 'value': 46, 'day': '2024-11-25' }, { 'value': 60, 'day': '2024-11-26' }, { 'value': 90, 'day': '2024-11-27' }, { 'value': 278, 'day': '2024-11-28' }, { 'value': 238, 'day': '2024-11-29' }, { 'value': 63, 'day': '2024-11-30' }, { 'value': 298, 'day': '2024-12-01' }, { 'value': 439, 'day': '2024-12-02' }, { 'value': 81, 'day': '2024-12-03' }, { 'value': 441, 'day': '2024-12-04' }, { 'value': 145, 'day': '2024-12-05' }, { 'value': 66, 'day': '2024-12-06' }, { 'value': 167, 'day': '2024-12-07' }, { 'value': 424, 'day': '2024-12-08' }, { 'value': 222, 'day': '2024-12-09' }, { 'value': 314, 'day': '2024-12-10' }, { 'value': 309, 'day': '2024-12-11' }, { 'value': 494, 'day': '2024-12-12' }, { 'value': 20, 'day': '2024-12-13' }, { 'value': 368, 'day': '2024-12-14' }, { 'value': 351, 'day': '2024-12-15' }, { 'value': 137, 'day': '2024-12-16' }, { 'value': 456, 'day': '2024-12-17' }, { 'value': 138, 'day': '2024-12-18' }, { 'value': 323, 'day': '2024-12-19' }, { 'value': 442, 'day': '2024-12-20' }, { 'value': 293, 'day': '2024-12-21' }, { 'value': 361, 'day': '2024-12-22' }, { 'value': 70, 'day': '2024-12-23' }, { 'value': 388, 'day': '2024-12-24' }, { 'value': 139, 'day': '2024-12-25' }, { 'value': 178, 'day': '2024-12-26' }, { 'value': 108, 'day': '2024-12-27' }, { 'value': 169, 'day': '2024-12-28' }, { 'value': 82, 'day': '2024-12-29' }, { 'value': 144, 'day': '2024-12-30' }, { 'value': 167, 'day': '2024-12-31' }]

    async function getBestStreakActivity() {
        try {
            const { data } = await api.get("/reports/best_streak/");

            setBestStreakActivity(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getEdgeDifficultyActivities() {
        try {
            const { data } = await api.get(
                "/reports/edges_difficulty_activities_to_perform/"
            );

            setEdgeDifficultyActivities(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getCurrentHabits() {
        try {
            const { data } = await api.get("/reports/current_habits/");

            setCurrentHabits(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    async function getHabitFormationProgress() {
        try {
            const { data } = await api.get(
                "/reports/habit_formation_progress/"
            );

            setHabitFormationProgress(data);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.detail) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="grid h-64 grid-cols-4 gap-6">
                {/* more performed acitivity */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">
                        Atividade mais performada
                    </h2>
                    {morePerformedActivity ? (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                {morePerformedActivity?.activity.name}{" "}
                                <Medal size={24} />
                            </h3>
                            <p className="mt-4">
                                Atividade "{morePerformedActivity?.activity.name}"
                                foi completada{" "}
                                <span className="text-lg font-semibold text-blue-300">
                                    {morePerformedActivity?.count}
                                </span>{" "}
                                vezes no total
                            </p>
                            <p className="mt-2 text-sm">"x%" a mais que outras</p>
                        </div>
                    ) : (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <div className="text-neutral-300 text-center">Nenhuma atividade foi completada. Começe a completar suas atividades
                                <Link to={"/dashboard/today"} className="font-semibold text-blue-300 cursor-pointer"> hoje</Link>.
                            </div>
                            <span className="mt-2"><Medal size={24} /></span>
                        </div>
                    )}
                </div>

                {/* best streak acitivty */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">
                        Atividade com a melhor sequência
                    </h2>
                    {bestStreakActivity ? (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                {bestStreakActivity?.activity.name}{" "}
                                <Fire size={24} />
                            </h3>
                            <p className="mt-4">
                                Atividade "{morePerformedActivity?.activity.name}"
                                foi completada{" "}
                                <span className="text-lg font-semibold text-blue-300">
                                    {bestStreakActivity?.streak}
                                </span>{" "}
                                vezes em sequência desde "01/01/2000"
                            </p>
                        </div>
                    ) : (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <div className="text-neutral-300">
                                Nenhuma sequência até o momento. Começe a completar suas atividades todos os dias e
                                a melhor aparecerá aqui.
                            </div>

                            <span className="mt-2"><Fire size={24} /></span>
                        </div>
                    )
                    }
                </div>

                {/* more easy x more difficult */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">Fácil | Difícil</h2>

                    {edgeDifficultyActivities ? (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <div className="borde flex h-full items-center py-6">
                                <div className="pl-6 text-left">
                                    <h3>Mais fácil</h3>
                                    <p className="my-1 font-semibold">
                                        {
                                            edgeDifficultyActivities?.highest
                                                .activity.name
                                        }
                                    </p>
                                    <p className="text-sm">
                                        Média de percepção de esforço:{" "}
                                        <span className="text-base font-semibold text-blue-300">
                                            {edgeDifficultyActivities?.highest.average_effort
                                                .toFixed(1)
                                                .toString()}
                                        </span>
                                    </p>
                                </div>
                                <div className="h-full border border-neutral-700 border-y-transparent border-r-transparent"></div>
                                <div className="pl-6 text-left">
                                    <h3>Mais difícil</h3>
                                    <p className="my-1 font-semibold">
                                        {
                                            edgeDifficultyActivities?.lowest
                                                .activity.name
                                        }
                                    </p>
                                    <p className="text-sm">
                                        Média de percepção de esforço:{" "}
                                        <span className="text-base font-semibold text-blue-300">
                                            {edgeDifficultyActivities?.lowest.average_effort
                                                .toFixed(1)
                                                .toString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <div className="text-neutral-300">
                                Complete atividades para exibir as atividades mais facéis e mais dificeis para você com base na sua percepção de esforço
                            </div>
                            <span className="mt-2"><ArrowsInLineHorizontal size={24} /></span>
                        </ div>
                    )}
                    
                </div>
                <div className="flex bg-neutral-950 p-3"></div>
            </div>

            <div className="grid h-64 grid-cols-4 gap-6">
                {/* current habits */}
                <div className="col-span-2 flex h-64 w-full flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <h2 className="text-lg font-bold">Hábitos atuais</h2>
                    {currentHabits.length > 0 ? (
                        currentHabits.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="flex h-full w-44 flex-col rounded-md bg-neutral-800 p-2"
                                >
                                    <div className="flex h-full w-full flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {item.name}
                                            </h3>
                                            <p className="mt-2 text-neutral-400">
                                                Lorem, ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                            </p>
                                        </div>

                                        <p className="text-sm">
                                            Hábito criado em "01/01/2000"
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h1>
                            Quando você tiver hábitos formados, eles aparecerão
                            aqui.
                        </h1>
                    )}
                </div>

                {/* habit formation progress */}
                <div className="flex flex-col gap-3 rounded-md bg-neutral-900 p-3 ">
                    <h2 className="text-lg font-bold">
                        Formação de novos hábitos
                    </h2>
                    {habitFormationProgress.length > 0 ? (
                        <div className="relative flex h-full w-full flex-col items-start gap-3 rounded-md bg-neutral-800 p-4 text-center">
                        {habitFormationProgress.map((item) => {
                            return (
                                <div
                                    key={item.activity.id.toString()}
                                    className="w-full rounded-md border border-neutral-700 p-2 text-start"
                                >
                                    <div className="flex justify-between">
                                        <p className="font-semibold">
                                            {item.activity.name}
                                        </p>
                                        <span className="font-semibold">
                                            75%
                                        </span>
                                    </div>
                                    <div className="mt-1 h-2 rounded-md border border-neutral-700">
                                        <div className="h-full w-2/3 rounded-md bg-blue-400"></div>
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                    ) : (
                        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-800 p-2 text-center">
                            <div className="text-neutral-300">
                                Complete atividades em sequência e veja o progresso de cada uma delas até se tornarem um hábito.
                            </div>
                            <span className="mt-2"><Percent size={24} /></span>
                        </ div>
                    )}
                </div>
            </div>
            <div className="grid h-64 grid-cols-4 gap-6">
                {/* current habits */}
                <div className="col-span-3 flex h-64 flex-col gap-3 rounded-md bg-neutral-900 p-3">
                    <h2 className="text-lg font-bold">Hábitos atuais</h2>
                    <div className="bg-neutral-800 h-full rounded-md flex items-center">
                        <div className="h-40 w-full">
                            <ResponsiveCalendar
                                data={calendarData}
                                from="2024-01-02"
                                to="2024-12-31"
                                theme={{
                                    "tooltip": {
                                        "container": {
                                            "background": "#171717",
                                            "color": "#e5e5e5",
                                            "fontSize": 14
                                        },
                                    },
                                }}
                                colors={["#1e40af", "#1d4ed8", "#2563eb", "#3b82f6"]}
                                dayBorderWidth={2}
                                monthBorderWidth={1}
                                daySpacing={2}
                                monthBorderColor="#171717"
                                dayBorderColor="#171717"
                                emptyColor="#262626"
                                monthLegendOffset={5}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
